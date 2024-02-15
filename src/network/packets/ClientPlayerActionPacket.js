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

const BlockBreakException = require("../../utils/exceptions/BlockBreakException")

const { Event } = require("@kotinash/better-events")

const {
	Gamemode,
	BlockAction
} = require("@greenfrog/mc-enums")

const Logger = require("../../utils/Logger")

const { get_key } = require("../../utils/Language")

const Frog = require("../../Frog")

class ClientPlayerActionPacket extends Packet {
	name = "player_action"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		const { action, position, result_position, face } = packet.data.params

		switch (action) {
			case BlockAction.CreativePlayerBreakBlock:
				if (player.gamemode === !Gamemode.CREATIVE) {
					throw new BlockBreakException(get_key("exceptions.network.inventoryTransaction.invalid", [player.name]))
				}

				Frog.event_emitter.emit(
					new Event(
						"blockBreak",
						{
							player,
							action,
							position,
							result_position,
							face
						},
						(() => {
							player.world.break_block(position.x, position.y, position.z)
						})
					),
					true
				)

				break
			default:
				Logger.debug(get_key("debug.player.unsupportedAction.block", [player.name, action]))
		}
	}
}

module.exports = ClientPlayerActionPacket
