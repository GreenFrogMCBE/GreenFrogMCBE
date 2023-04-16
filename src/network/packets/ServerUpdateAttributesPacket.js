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
const PacketConstructor = require("./PacketConstructor");

let id = -1;
let attributes = null;
let tick = -1;

class ServerUpdateAttributesPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {String} The name of the packet.
	 */
	getPacketName() {
		return "update_attributes";
	}

	/**
	 * Returns whether the packet is critical or not.
	 * @returns {Boolean} Returns true if the packet is critical, false otherwise.
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the player ID
	 * @param {Number} new_playerid
	 */
	setPlayerID(new_playerid) {
		id = new_playerid;
	}

	/**
	 * Returns the player ID
	 * @returns {Number}
	 */
	getPlayerID() {
		return id;
	}

	/**
	 * Sets the attributes
	 * @param {Array<JSON>} attr
	 */
	setAttributes(attr) {
		attributes = attr;
	}

	/**
	 * Returns the attributes
	 * @returns {Array<JSON>}
	 */
	getAttributes() {
		return attributes;
	}

	/**
	 * Sets the current tick
	 * @param {Number} new_tick - The tick
	 */
	setTick(new_tick) {
		tick = new_tick;
	}

	/**
	 * Returns the current tick
	 * @returns {Number};
	 */
	getTick() {
		return tick;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			runtime_entity_id: this.getPlayerID(),
			attributes: this.getAttributes(),
			tick: this.getTick(),
		});
	}
}

module.exports = ServerUpdateAttributesPacket;
