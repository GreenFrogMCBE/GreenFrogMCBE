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
const Dimensions = require("./types/DimensionLegacy");

const PacketConstructor = require("./PacketConstructor");

let dimension = Dimensions.OVERWORLD;
let pos = {
	x: 0,
	y: 0,
	z: 0,
};
let respawn = false;

class ServerChangeDimensionPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "change_dimension";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the dimension
	 * @param {Dimensions} new_dimension
	 */
	setDimension(new_dimension) {
		dimension = new_dimension;
	}

	/**
	 * Sets the spawn position
	 * @param {float} x
	 * @param {float} y
	 * @param {float} z
	 */
	setPosition(x, y, z) {
		pos.x = x;
		pos.y = y;
		pos.z = z;
	}

	/**
	 * Sets if the player needs to be respawned after the dimension change (default = false)
	 * @param {boolean} needs_respawn
	 */
	setRespawn(needs_respawn) {
		respawn = needs_respawn;
	}

	/**
	 * Returns the dimension
	 * @returns {Dimensions} The dimension
	 * @type {import("./types/Dimension")}
	 */
	getDimension() {
		return dimension;
	}

	/**
	 * Returns if the player needs the be respawned
	 * @returns {boolean} If the player needs to be respawned
	 */
	getRespawn() {
		return respawn;
	}

	/**
	 * Returns the position of the player
	 * @returns {JSON} The position of the player
	 */
	getPosition() {
		return pos;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			dimension: this.getDimension(),
			position: this.getPosition(),
			respawn: this.getRespawn(),
		});
	}
}

module.exports = ServerChangeDimensionPacket;
