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
const Packet = require("./Packet");

const BlockBreakException = require("../../utils/exceptions//BlockBreakException");

const Gamemode = require("../../player/types/Gamemode");
const BlockAction = require("../../world/types/BlockAction");

const Logger = require("../../utils/Logger");

const Frog = require("../../Frog");

const { getKey } = require("../../utils/Language");

class ClientPlayerActionPacket extends Packet {
	name = "player_action";

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async readPacket(player, packet) {
		const { action, position, result_position, face } = packet.data.params;

		switch (action) {
			case BlockAction.BLOCK_BREAK: // TODO: FIX!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DONT FORGET TO FIX BEFORE COMMITING IT TO THE REPO U STUPID MONKEY
				if (player.gamemode == Gamemode.SURVIVAL || player.gamemode == Gamemode.ADVENTURE || player.gamemode == Gamemode.SPECTATOR) {
					throw new BlockBreakException(getKey("exceptions.network.inventoryTransaction.invalid").replace("%s", player.username));
				}

				Frog.eventEmitter.emit("blockBreakEvent", {
					player,
					action,
					position,
					result_position,
					face,
				});

				player.world.breakBlock(position.x, position.y, position.z);
				break;
			default:
				Logger.debug(getKey("debug.player.unsupportedAction.block").replace("%s", player.username).replace("%d", action));
		}
	}
}

module.exports = ClientPlayerActionPacket;
