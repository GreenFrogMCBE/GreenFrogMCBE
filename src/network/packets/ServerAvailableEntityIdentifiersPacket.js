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

class AvailableEntityIdentifiers extends PacketConstructor {
	/**
	 * Returns the packet name
 	 * @returns The name of the packet
 	*/
	getPacketName() {
		return "available_entity_identifiers";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return true
	}

	/**
	 * It sets the packet value
	 * @param pkvalue - The packet value data to set.
	 */
	setValue(pkvalue) {
		value = pkvalue;
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
		client.queue(this.name(), this.getValue());
	}
}

module.exports = AvailableEntityIdentifiers;
