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
let data = null;

const PacketConstructor = require('./PacketConstructor')

class ServerAvailableCommandsPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "available_commands";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * It sets the packet data
	 * @param {JSON} new_data - The new command data
	 */
	setData(new_data) {
		data = new_data;
	}

	/**
	 * It returns the command data
	 * @returns {JSON} The command data
	 */
	getData() {
		return data;
	}

	/**
	 * It sends the packet to the client
	 * @param {Object} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), this.getData());
	}
}

module.exports = ServerAvailableCommandsPacket;
