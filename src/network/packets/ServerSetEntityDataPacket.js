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

class ServerSetEntityDataPacket extends Packet {
	name = "set_entity_data"

	/** @type {import("Frog").EntityDataProperties | undefined} */
	properties
	/** @type {string | undefined} */
	tick
	/** @type {import("Frog").EntityData | undefined} */
	value
	/** @type {string | undefined} */
	runtime_entity_id

	/**
	 * @param {import("Frog").Player} player
	 */
	write_packet(player) {
		player.queue(this.name, {
			runtime_entity_id: this.runtime_entity_id,
			metadata: [
				{
					key: "flags",
					type: "long",
					value: this.value,
				},
			],
			properties: this.properties,
			tick: this.tick,
		})
	}
}

module.exports = ServerSetEntityDataPacket
