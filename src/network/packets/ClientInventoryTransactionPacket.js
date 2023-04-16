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
const BlockBreakException = require("../../utils/exceptions/BlockBreakException");
const PacketConstructor = require("./PacketConstructor");

const GameMode = require("../../api/GameMode");
const BlockActions = require("./types/BlockActions");

const Logger = require("../../server/Logger");
const Frog = require("../../Frog");

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
			case BlockActions.BLOCKBREAK:
				if (player.gamemode == GameMode.ADVENTURE || player.gamemode == GameMode.SPECTATOR) {
					throw new BlockBreakException("Player tried to break block, while in " + player.gamemode + " gamemode");
				}

				Frog.eventEmitter.emit('blockBreakEvent', {
					actions: packet.data.params.actions,
					legacy: packet.data.params.transaction.legacy,
					player: player,
					server: server,
					action: packet.data.params.transaction.transaction_data.actionType,
					blockPosition: packet.data.params.transaction.transaction_data.blockPosition,
					transactionType: packet.data.params.transaction.transactionType,
				})
				break;
			default:
				Logger.debug("Unsupported block action from " + player.username + ": " + actionID);
		}
	}
}

module.exports = ClientInventoryTransactionPacket;
