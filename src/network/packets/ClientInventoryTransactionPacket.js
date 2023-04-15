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

const GameMode = require("../../api/GameMode");
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
	 * @param {Client} player
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
				if (player.gamemode == GameMode.ADVENTURE || player.gamemode == GameMode.SPECTATOR) {
					throw new Error("Player tried to break block, while in " + player.gamemode + " gamemode");
				}

				const blockbreakevent = new BlockBreakEvent();
				blockbreakevent.actions = packet.data.params.actions;
				blockbreakevent.legacy = packet.data.params.transaction.legacy;
				blockbreakevent.player = player;
				blockbreakevent.server = server;
				blockbreakevent.action = packet.data.params.transaction.transaction_data.action_type;
				blockbreakevent.block_position = packet.data.params.transaction.transaction_data.block_position;
				blockbreakevent.transaction_type = packet.data.params.transaction.transaction_type;
				blockbreakevent.execute();
				break;
			default:
				Logger.debug("Unsupported block action from " + player.username + ": " + actionID);
		}
	}
}

module.exports = ClientInventoryTransactionPacket;
