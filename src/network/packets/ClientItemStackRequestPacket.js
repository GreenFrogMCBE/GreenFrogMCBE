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
const PacketConstructor = require("./PacketConstructor");

const ServerInventorySlotPacket = require("./ServerInventorySlotPacket");
const InventoryType = require("./types/InventoryType");

const PacketHandlingError = require("./exceptions/PacketHandlingError");

const { lang } = require("../../api/ServerInfo");
const Logger = require("../../server/Logger");

class ClientItemStackRequestPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
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

	validatePacket(player) {
		if (player.gamemode == !1) {
			throw new PacketHandlingError("Itemstackrequest from non-creative gamemode player");
		}
	}

	/**
	 * Reads the packet from player
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet) {
		//TODO: Event

		await this.validatePacket(player);

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

			const jsondata = { count, network_id, block_runtime_id };
			player.items.push(jsondata);

			for (const [i, item] of player.items.entries()) {
				const is = new ServerInventorySlotPacket();
				is.setWindowID(InventoryType.INVENTORY);
				is.setSlot(i);
				is.setItemData({
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
				is.writePacket(player);
			}
		} catch (e) {
			Logger.error(lang.errors.failedToHandleItemRequest.replace("%data%", `${player.username}: ${e.stack}`));
		}
	}
}

module.exports = ClientItemStackRequestPacket;
