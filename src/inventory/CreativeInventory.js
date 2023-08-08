/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../Frog");
const Logger = require("../utils/Logger");

const { getKey } = require("../utils/Language");

const ServerInventorySlotPacket = require("../network/packets/ServerInventorySlotPacket");

const WindowType = require("../inventory/types/WindowType");
const TypeId = require("./types/Transaction");

const Inventory = require("./Inventory");

class CreativeInventory extends Inventory {
	/**
     * @param {import("Frog").Player} player 
	 * @param {import("Frog").Packet} packet 
	*/
	handle(player, packet) {
		try {
			const requests = packet.data.params.requests;
			const firstRequest = requests[0];
			const firstAction = firstRequest.actions[0];
			const secondAction = firstRequest.actions[1];

			if (firstAction && secondAction && secondAction.type_id === TypeId.RESULTS) {
				let shouldGiveItem = true;

				Frog.eventEmitter.emit("inventoryPreItemRequest", {
					count: firstAction.count,
					network_id: secondAction.result_items[0].network_id,
					block_runtime_id: secondAction.result_items[0].block_runtime_id,
					cancel: () => {
						shouldGiveItem = true;
					},
				});

				if (!shouldGiveItem) return;

				player.inventory.lastUsedItem.runtimeId = secondAction.result_items[0].block_runtime_id;
				player.inventory.lastUsedItem.networkId = secondAction.result_items[0].network_id;

				player.inventory.items.push({
					count: firstAction.count,
					network_id: secondAction.result_items[0].network_id,
					block_runtime_id: secondAction.result_items[0].block_runtime_id,
				});

				Frog.eventEmitter.emit("inventoryPostItemRequest", {
					count: firstAction.count,
					network_id: secondAction.result_items[0].network_id,
					block_runtime_id: secondAction.result_items[0].block_runtime_id,
					inventoryItems: player.inventory.items,
				});
			}

			if (firstAction.type_id === TypeId.PLACE) {
				const inventorySlotPacket = new ServerInventorySlotPacket();
				inventorySlotPacket.window_id = WindowType.CREATIVE_INVENTORY;
				inventorySlotPacket.slot = firstAction.destination.slot;
				inventorySlotPacket.item = {
					network_id: player.inventory.lastUsedItem.networkId,
					count: firstAction.count,
					metadata: 0,
					has_stack_id: 1,
					stack_id: 1,
					block_runtime_id: player.inventory.lastUsedItem.runtimeId,
					extra: {
						has_nbt: 0,
						can_place_on: [],
						can_destroy: [],
					},
				};
				inventorySlotPacket.writePacket(player);
			}
		} catch (error) {
			Logger.error(getKey("creativemenu.badPacket").replace("%s", player.username).replace("%d", error.stack));
		}
	}
}

module.exports = CreativeInventory;