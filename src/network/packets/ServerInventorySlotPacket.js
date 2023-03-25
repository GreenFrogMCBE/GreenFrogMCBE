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

const PacketConstructor = require("./PacketConstructor");

class ServerInventorySlotPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "inventory_slot";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the window ID.
	 * @param {Number} ID
	 */
	setWindowID(new_id) {
		window_id = new_id;
	}

	/**
	 * Sets the slot of the item.
	 * @param {Number} new_slot
	 */
	setSlot(new_slot) {
		slot = new_slot;
	}

	/**
	 * Sets the item data (NBT).
	 * @param {JSON} new_item_data
	 */
	setItemData(new_item_data) {
		itemdata = new_item_data;
	}

	/**
	 * Returns the window ID.
	 * @returns {Number} The window ID.
	 */
	getWindowID() {
		return window_id;
	}

	/**
	 * Returns the slot of the item.
	 * @returns {Number}
	 */
	getSlot() {
		return slot;
	}

	/**
	 * Returns the item data (NBT).
	 * @returns {JSON} The item data.
	 */
	getItemData() {
		return itemdata;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			window_id: this.getWindowID(),
			slot: this.getSlot(),
			item: this.getItemData(),
		});
	}
}

module.exports = ServerInventorySlotPacket;
