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
let status = "";

const PacketConstructor = require("./PacketConstructor");

class ServerPlayStatusPacket extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "play_status";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return true
	}

	/**
	 * It sets the status.
	 * @param status1 - The status
	 */
	setStatus(status1) {
		status = status1;
	}

	/**
	 * It returns the status.
	 * @returns The status
	 */
	getStatus() {
		return status;
	}

	writePacket(client) {
		client.queue(this.getPacketName(), {
			status: this.getStatus(),
		});
	}
}

module.exports = ServerPlayStatusPacket;
