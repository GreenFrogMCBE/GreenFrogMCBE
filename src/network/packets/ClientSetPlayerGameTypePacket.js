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

const { getKey } = require("../../utils/Language")

class ClientSetPlayerGameTypePacket extends Packet {
	name = "set_player_game_types"

	/**
	 * @param {import("Frog").Player} player
	 */
	validatePacket(player) {
		if (!player.permissions.op) throw new InvalidGamemodeException(getKey("exceptions.network.invalidGamemodePacket"))
	}

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async readPacket(player, packet) {
		this.validatePacket(player)

		const gamemode = packet.data.params.gamemode

		let shouldChange = true

		Frog.eventEmitter.emit("playerGamemodeChangeRequest", {
			player,
			gamemode,
			cancel: () => {
				shouldChange = false
			},
		})

		if (!shouldChange) return

		player.setGamemode(gamemode)
	}
}

module.exports = ClientSetPlayerGameTypePacket
