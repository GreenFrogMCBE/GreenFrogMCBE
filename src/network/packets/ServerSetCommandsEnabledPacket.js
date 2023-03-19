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

let enabled = true;

const PacketConstructor = require("./PacketConstructor");

class ServerSetCommandsEnabledPacket extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "set_commands_enabled";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * It returns if commands are enabled or not.
	 * @param {Boolean} enabled1 - Are commands enabled.
	 */
	setEnabled(enabled1) {
		enabled = enabled1;
	}

	/**
	 * It returns if commands are enabled or not.
	 * @returns If the commands are enabled.
	 */
	getEnabled() {
		return enabled;
	}

	/**
	 * @param {Object} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			enabled: this.getEnabled(),
		});
	}
}

module.exports = ServerSetCommandsEnabledPacket;
