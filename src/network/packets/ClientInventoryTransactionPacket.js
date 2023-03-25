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
/* eslint-disable no-case-declarations */
const BlockBreakEvent = require("../../events/BlockBreakEvent");
const PacketConstructor = require("./PacketConstructor");
const BlockActions = require("./types/BlockActions");
const Logger = require("../../server/Logger");

class ClientInventoryTransactionPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "inventory_transaction";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from client
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet, server) {
		let actionID = null;

		try {
			actionID = packet.data.params.transaction.transaction_data.action_type;
		} catch {
			actionID = null;
		}

		switch (actionID) {
			case BlockActions.BREAKBLOCK:
				const blockbreakevent = new BlockBreakEvent();
				blockbreakevent.actions = packet.data.params.actions;
				blockbreakevent.legacy = [];
				blockbreakevent.player = player;
				blockbreakevent.server = server;
				blockbreakevent.transaction_data = packet.data.params.transaction_data;
				blockbreakevent.transaction_type = packet.data.params.transaction_type;
				blockbreakevent.execute();
				break;
			default:
				Logger.debug("Unsupported Block action from " + player.username + ": " + actionID);
		}
	}
}

module.exports = ClientInventoryTransactionPacket;
