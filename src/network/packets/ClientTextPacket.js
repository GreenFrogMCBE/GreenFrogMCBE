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

const PlayerInfo = require("../../player/PlayerInfo")

const Logger = require("../../utils/Logger")

const { get_key } = require("../../utils/Language")

const Packet = require("./Packet")

class ClientTextPacket extends Packet {
	name = "text"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		const message = packet.data.params.message

		if (
			Frog.config.chat.features.chat ||
			!message.trim() ||
			message.startsWith("/")
		) {
			return
		}

		let should_chat = true

		Frog.event_emitter.emit("playerChat", {
			player,
			message,
			cancel: () => {
				should_chat = false
			},
		})

		if (!should_chat) return

		const formatted_message =
			get_key("chat.format",
				[
					player.username,
					message.replace(/§/g, "")
				]
			)

		Logger.info(formatted_message)

		for (const recipient of PlayerInfo.players_online) {
			recipient.send_message(formatted_message)
		}
	}
}

module.exports = ClientTextPacket
