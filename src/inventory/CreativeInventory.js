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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../Frog");
const Logger = require("../server/Logger");

const { getKey } = require("../utils/Language");

const ServerInventorySlotPacket = require("../network/packets/ServerInventorySlotPacket");
const WindowType = require("../network/packets/types/WindowType");

module.exports = {
	handle(player, packet) {
		try {
			if (player.inventory.container.isOpen) return

			const requests = packet.data.params.requests;
			const firstRequest = requests[0];
			const firstAction = firstRequest.actions[0];
			const secondAction = firstRequest.actions[1];

			if (firstAction && secondAction && secondAction.type_id === "results_deprecated") {
				let shouldGiveItem = true;

				Frog.eventEmitter.emit("playerPreItemStackRequest", {
					count: firstAction.count,
					network_id: secondAction.result_items[0].network_id,
					block_runtime_id: secondAction.result_items[0].block_runtime_id,
					cancel: () => {
						shouldGiveItem = true;
					},
				});

				if (!shouldGiveItem) return;

				player.inventory.lastKnownItemRuntimeId = secondAction.result_items[0].block_runtime_id;
				player.inventory.lastKnownItemNetworkId = secondAction.result_items[0].network_id;

				player.inventory.items.push({
					count: firstAction.count,
					network_id: secondAction.result_items[0].network_id,
					block_runtime_id: secondAction.result_items[0].block_runtime_id,
				});

				Frog.eventEmitter.emit("playerPostItemStackRequest", {
					count: firstAction.count,
					network_id: secondAction.result_items[0].network_id,
					block_runtime_id: secondAction.result_items[0].block_runtime_id,
					inventoryItems: player.items,
				});
			}

			if (firstAction.type_id === "place") {
				const inventorySlotPacket = new ServerInventorySlotPacket();

				inventorySlotPacket.setWindowId(WindowType.CREATIVEINVENTORY);
				inventorySlotPacket.setSlot(firstAction.destination.slot);
				inventorySlotPacket.setItemData({
					network_id: player.inventory.lastKnownItemNetworkId,
					count: firstAction.count,
					metadata: 0,
					has_stack_id: 1,
					stack_id: 1,
					block_runtime_id: player.inventory.lastKnownItemRuntimeId,
					extra: {
						has_nbt: 0,
						can_place_on: [],
						can_destroy: [],
					},
				});

				inventorySlotPacket.writePacket(player);
			}
		} catch (error) {
			Logger.error(getKey("creativemenu.badPacket").replace("%s%", player.username).replace("%d%", error.stack));
		}
	},
};
