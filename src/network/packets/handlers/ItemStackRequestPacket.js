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
const PacketHandlingError = require("../exceptions/PacketHandlingError");
const GameModeLegacy = require("../types/GameModeLegacy");
const { lang } = require("../../../api/ServerInfo");
const InventorySlot = require("../InventorySlot");
const Logger = require("../../../server/Logger");
const Handler = require("./Handler");

class ItemStackRequest extends Handler {
	validate(client) {
		if (client.gamemode !== GameModeLegacy.CREATIVE) throw new PacketHandlingError(lang.itemExploit);
	}

	handle(client, packet) {
		try {
			const request = packet.data.params.requests[0].actions[1].result_items[0];
			const count = request?.count || 0;
			const network_id = request?.network_id || 0;
			const block_runtime_id = request?.block_runtime_id || 0;

			const jsondata = { count, network_id, block_runtime_id };
			client.items.push(jsondata);

			for (const [i, item] of client.items.entries()) {
				const is = new InventorySlot();
				is.setWindowId("inventory");
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
				is.send(client);
			}
		} catch (error) {
			Logger.error(lang.errors.failedToHandleItemRequest.replace("%data%", `${client.username}: ${error.stack}`));
		}
	}
}

module.exports = ItemStackRequest;
