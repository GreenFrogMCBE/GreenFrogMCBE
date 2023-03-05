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

class ItemComponent extends require("./Packet") {
	/**
	 * @returns The name of the packet.
	 */
	name() {
		return "item_component";
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
	 * Sends the packet to the client
	 * @param {any} client
	 */
	send(client) {
		client.queue(this.name(), {
			entries: this.getItems(),
		});
	}
}

module.exports = ItemComponent;
