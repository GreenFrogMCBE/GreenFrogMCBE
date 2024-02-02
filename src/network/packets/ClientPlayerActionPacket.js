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
const Packet = require("./Packet")

const BlockBreakException = require("../../utils/exceptions//BlockBreakException")

const Gamemode = require("../../player/types/Gamemode")
const BlockAction = require("../../world/types/BlockAction")

const Logger = require("../../utils/Logger")

const Frog = require("../../Frog")

const { get_key } = require("../../utils/Language")

class ClientPlayerActionPacket extends Packet {
	name = "player_action"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		const { action, position, result_position, face } = packet.data.params

		switch (action) {
			case BlockAction.CREATIVE_PLAYER_BREAK_BLOCK:
				if (player.gamemode == Gamemode.SURVIVAL || player.gamemode == Gamemode.ADVENTURE || player.gamemode == Gamemode.SPECTATOR) {
					throw new BlockBreakException(get_key("exceptions.network.inventoryTransaction.invalid").replace("%s", player.username))
				}

				Frog.event_emitter.emit("blockBreak", {
					player,
					action,
					position,
					result_position,
					face,
				})

				player.world.break_block(position.x, position.y, position.z)
				break
			default:
				Logger.debug(get_key("debug.player.unsupportedAction.block").replace("%s", player.username).replace("%d", action))
		}
	}
}

module.exports = ClientPlayerActionPacket
