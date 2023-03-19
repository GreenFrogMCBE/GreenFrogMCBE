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
let gitems = [];

const PacketConstructor = require("./PacketConstructor");

class ItemComponent extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "item_component";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}
	/**
	 * Sets the custom items (some items may require texture pack)
	 * @param {Array} itemstoset
	 */
	setItems(items) {
		gitems = items;
	}

	/**
	 * Returns the custom items list as an array
	 * @returns The custom items list as an array
	 */
	getItems() {
		return gitems;
	}

	/**
	 * writePackets the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		client.queue(this.name(), {
			entries: this.getItems(),
		});
	}
}

module.exports = ItemComponent;
