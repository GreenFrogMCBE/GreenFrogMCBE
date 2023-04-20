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
let value = {};

const PacketConstructor = require("./PacketConstructor");

class ServerBiomeDefinitionListPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "biome_definition_list";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return true;
	}

	/**
	 * Sets the packet value
	 * @param new_value - The packet value.
	 */
	setValue(new_value) {
		value = new_value;
	}

	/**
	 * Returns the packet value
	 * @returns {JSON}
	 */
	getValue() {
		return value;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), this.getValue());
	}
}

module.exports = ServerBiomeDefinitionListPacket;
