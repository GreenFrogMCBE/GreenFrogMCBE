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
let window_id = null;
let slot = 0;
let itemdata = {};

class InventorySlot extends require("./Packet") {
	/**
	 * @returns The name of the packet.
	 */
	name() {
		return "inventory_slot";
	}

	/**
	 * It sets the window id.
	 * @param {Number} id
	 */
	setWindowId(id) {
		window_id = id;
	}

	/**
	 * It sets the slot.
	 * @param {Number} slot1
	 */
	setSlot(slot1) {
		slot = slot1;
	}

	/**
	 * It sets the item data.
	 * @param {JSON} itemdata1
	 */
	setItemData(itemdata1) {
		itemdata = itemdata1;
	}

	/**
	 * It returns the window id.
	 * @returns The window id.
	 */
	getWindowId() {
		return window_id;
	}

	/**
	 * It returns the slot.
	 * @returns The slot.
	 */
	getSlot() {
		return slot;
	}

	/**
	 * It returns the item data.
	 * @returns The item data.
	 */
	getItemData() {
		return itemdata;
	}

	send(client) {
		client.queue(this.name(), {
			window_id: this.getWindowId(),
			slot: this.getSlot(),
			item: this.getItemData(),
		});
	}
}

module.exports = InventorySlot;
