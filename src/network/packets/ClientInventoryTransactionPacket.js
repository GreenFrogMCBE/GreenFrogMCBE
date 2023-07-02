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
/* eslint-disable no-case-declarations */
const BlockBreakException = require("../../utils/exceptions/BlockBreakException");
const PacketConstructor = require("./PacketConstructor");

const Gamemode = require("../../api/player/Gamemode");
const BlockActions = require("../../world/types/BlockAction");

const Logger = require("../../server/Logger");
const Frog = require("../../Frog");

const { getKey } = require("../../utils/Language");

class ClientInventoryTransactionPacket extends PacketConstructor {
	name = 'inventory_transaction'

	async readPacket(player, packet, server) {
		let actionID = null;

		try {
			actionID = packet.data.params.transaction.transaction_data.action_type;
		} catch {
			actionID = null;
		}

		switch (actionID) {
			case BlockActions.BLOCKBREAK:
				if (player.gamemode == Gamemode.ADVENTURE || player.gamemode == Gamemode.SPECTATOR) {
					throw new BlockBreakException(getKey("exceptions.network.inventoryTransaction.invalid").replace("%s%", player.username));
				}

				Frog.eventEmitter.emit("blockBreakEvent", {
					actions: packet.data.params.actions,
					legacy: packet.data.params.transaction.legacy,
					player: player,
					server: server,
					action: packet.data.params.transaction.transaction_data.actionType,
					blockPosition: packet.data.params.transaction.transaction_data.block_position,
					transactionType: packet.data.params.transaction.transaction_type,
				});

				player.world.breakBlock(packet.data.params.transaction.transaction_data.block_position.x, packet.data.params.transaction.transaction_data.block_position.y, packet.data.params.transaction.transaction_data.block_position.z);
				break;
			default:
				Logger.debug(getKey("debug.player.unsupportedActionID.block").replace("%s%", player.username).replace("%d%", actionID));
		}
	}
}

module.exports = ClientInventoryTransactionPacket;
