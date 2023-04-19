/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const Frog = require("../../Frog");

const PacketConstructor = require("./PacketConstructor");

const ItemException = require("../../utils/exceptions/ItemException");
const ServerInventorySlotPacket = require("./ServerInventorySlotPacket");
const GameModeLegacy = require("./types/GameModeLegacy");
const InventoryType = require("./types/InventoryType");

const { serverConfigurationFiles } = Frog;
const { lang } = serverConfigurationFiles

const Logger = require("../../server/Logger");

class ClientItemStackRequestPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string} The name of the packet
	 */
	getPacketName() {
		return "item_stack_request";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from player
	 * 
	 * @param {Client} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet) {
		if (player.gamemode == !GameModeLegacy.CREATIVE) {
			return
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

			let shouldGiveItem = true

			Frog.eventEmitter.emit('playerItemStackRequest', {
				count,
				network_id,
				block_runtime_id,
				items: player.items,
				cancel() {
					shouldGiveItem = true
				}
			})

			if (!shouldGiveItem) return

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
		} catch (e) {
			Logger.error(lang.errors.failedToHandleItemRequest.replace("%data%", `${player.username}: ${e.stack}`));
		}
	}
}

module.exports = ClientItemStackRequestPacket;
