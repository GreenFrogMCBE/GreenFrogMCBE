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
let items = [];

const PacketConstructor = require('./PacketConstructor')

class ServerCreativeContentPacket extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "creative_content";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return true
	}

	/**
	 * It sets the items list
	 * @param {Array<JSON>} items2 - The list of items
	 */
	setItems(items2) {
		items = items2;
	}

	/**
	 * It returns the items list
	 * @returns Item list
	 */
	getItems() {
		return items;
	}

	writePacket(client) {
		client.queue(this.getPacketName(), {
			items: items,
		});
	}
}

module.exports = ServerCreativeContentPacket;
