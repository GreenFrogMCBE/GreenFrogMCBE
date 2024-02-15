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
const Frog = require("../../Frog")

const Packet = require("./Packet")

const InvalidGamemodeException = require("../../utils/exceptions/InvalidGamemodeException")

const {EventEmitter,Event} = require("@kotinash/better-events")

const { get_key } = require("../../utils/Language")

class ClientSetPlayerGameTypePacket extends Packet {
	name = "set_player_game_types"

	/**
	 * @param {import("Frog").Player} player
	 */
	validate_packet(player) {
		if (!player.permissions.op) throw new InvalidGamemodeException(get_key("exceptions.network.invalidGamemodePacket"))
	}

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		this.validate_packet(player)

		const gamemode = packet.data.params.gamemode

		EventEmitter.emit(
			new Event(
				"playerGamemodeChangeRequest",
				{
					player,
					gamemode
				},
				(() => {
					player.set_gamemode(gamemode)
				})
			)
		)
	}
}

module.exports = ClientSetPlayerGameTypePacket
