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
const Frog = require("../../Frog");

const PacketConstructor = require("./PacketConstructor");

const ServerInventorySlotPacket = require("./ServerInventorySlotPacket");

const GamemodeLegacy = require("../../api/player/GamemodeLegacy");
const InventoryType = require("./types/InventoryType");

const Logger = require("../../server/Logger");

const InvalidItemStackException = require("../../utils/exceptions/InvalidItemStackException");

const { getKey } = require("../../utils/Language");

class ClientItemStackRequestPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "item_stack_request";
	}

	/**
	 * Reads the packet from player
	 *
	 * @param {Client} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet) {
		if (player.gamemode == !GamemodeLegacy.CREATIVE) {
			throw new InvalidItemStackException(getKey("exceptions.network.itemStackRequest.badGamemode"));
		}

		try {
			let request = null;

			try {
				request = packet.data.params.requests[0].actions[1].result_items[0];
			} catch {
				request = {
					count: 0,
					network_id: 0,
					block_runtime_id: 0,
				};
			}
			const count = request.count;
			const network_id = request.network_id;
			const block_runtime_id = request.block_runtime_id;

			let shouldGiveItem = true;

			Frog.eventEmitter.emit("playerItemStackRequest", {
				count,
				network_id,
				block_runtime_id,
				items: player.items,
				cancel: () => {
					shouldGiveItem = true;
				},
			});

			if (!shouldGiveItem) return;

			const jsondata = { count, network_id, block_runtime_id };
			player.items.push(jsondata);

			for (const [i, item] of player.items.entries()) {
				const inventorySlotPacket = new ServerInventorySlotPacket();

				inventorySlotPacket.setWindowID(InventoryType.INVENTORY);
				inventorySlotPacket.setSlot(i);
				inventorySlotPacket.setItemData({
					network_id: item.network_id,
					count: item.count,
					metadata: 0,
					has_stack_id: 1,
					stack_id: 1,
					block_runtime_id: item.block_runtime_id,
					extra: {
						has_nbt: 0,
						can_place_on: [],
						can_destroy: [],
					},
				});

				inventorySlotPacket.writePacket(player);
			}
		} catch (error) {
			Logger.error(getKey("creativemenu.badPacket").replace("%s%", player.username).replace("%e%", error.stack));
		}
	}
}

module.exports = ClientItemStackRequestPacket;
