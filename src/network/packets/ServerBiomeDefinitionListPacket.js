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
let value = null;

const PacketConstructor = require('./PacketConstructor')

class ServerBiomeDefinitionListPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "biome_definition_list";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return true
	}

	/**
	 * Sets the packet value
	 * @param newvalue - The packet value.
	 */
	setValue(newvalue) {
		value = newvalue;
	}

	/**
	 * It returns the packet value
	 * @returns The packet value.
	 */
	getValue() {
		return value;
	}

	/**
	 * It writePacket the packet to the client
	 * @param {Object} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), this.getValue());
	}
}

module.exports = ServerBiomeDefinitionListPacket;
