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
let window_id = 0;
let coordinates = {};
let window_type;
let runtime_entity_id = 0;

const PacketConstructor = require("./PacketConstructor");

class ServerContainerOpenPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "container_open";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the coordinates of the container
	 * If the container is creative menu then the coordinates are xyz: 0, 0, 0
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	setCoordinates(x, y, z) {
		coordinates = {
			x: x,
			y: y,
			z: z,
		};
	}

	/**
	 * Sets the window type
	 * @param {WindowTypes} new_window_type
	 */
	setWindowType(new_window_type) {
		window_type = new_window_type;
	}

	/**
	 * It sets the window ID
	 * @param {WindowID} new_window_id
	 */
	setWindowID(new_window_id) {
		window_id = new_window_id;
	}

	/**
	 * It sets the runtime entity id
	 * @param {string} new_runtime_entity_id
	 */
	setRuntimeEntityId(new_runtime_entity_id) {
		runtime_entity_id = new_runtime_entity_id;
	}

	/**
	 * It returns the window ID
	 * @returns {number} The window ID
	 */
	getWindowID() {
		return window_id;
	}

	/**
	 * It returns the runtime entity ID
	 * @returns {string} The runtime entity ID
	 */
	getCoordinates() {
		return coordinates;
	}

	/**
	 * Returns the window type
	 * @returns {WindowType} The window type
	 */
	getWindowType() {
		return window_type;
	}

	/**
	 * Returns the runtime entity id
	 * @returns {string} The runtime entity id
	 */
	getRuntimeEntityId() {
		return runtime_entity_id;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			window_id: this.getWindowID(),
			window_type: this.getWindowType(),
			coordinates: this.getCoordinates(),
			runtime_entity_id: this.getRuntimeEntityId(),
		});
	}
}

module.exports = ServerContainerOpenPacket;
