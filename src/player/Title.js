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
const Frog = require("../Frog")

const ServerSetTitlePacket = require("../network/packets/ServerSetTitlePacket")

const TitleType = require("./types/Title")

class Title {
	constructor() {
		/** @type {import("Frog").Title} */
		this.type = TitleType.TITLE
		/** @type {string} */
		this.text
		/** @type {number} */
		this.fade_in_time = 20
		/** @type {number} */
		this.stay_time = 20
		/** @type {number} */
		this.fade_out_time = 20
	}

	/**
	 * Sends the title to the client
	 *
	 * @param {import("Frog").Player} client The client to send the title to
	 */
	send(client) {
		let should_send_title = true

		Frog.event_emitter.emit("serverTitle", {
			fade_in_time: this.fade_in_time,
			fade_out_time: this.fade_out_time,
			stay_time: this.stay_time,
			text: this.text,
			type: this.type,
			cancel: () => {
				should_send_title = false
			},
		})

		if (!should_send_title) return

		const titlePacket = new ServerSetTitlePacket()
		titlePacket.fade_in_time = this.fade_in_time
		titlePacket.stay_time = this.stay_time
		titlePacket.text = this.text
		titlePacket.type = this.type
		titlePacket.fade_out_time = this.fade_out_time
		titlePacket.xuid = ""
		titlePacket.platform_online_id = ""
		titlePacket.write_packet(client)
	}
}

module.exports = Title
