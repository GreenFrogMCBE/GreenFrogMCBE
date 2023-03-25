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
let cords = {
	x: 0,
	y: 0,
	z: 0,
};
let window_type = "";
let runtime_entity_id = 0;

const PacketConstructor = require("./PacketConstructor");

class ServerContainerOpenPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "container_open";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the coordinates of the container
	 * If the container is creative menu then the cords are xyz: 0, 0, 0
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 */
	setCoordinates(x, y, z) {
		cords = {
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
	 * @param {String} new_runtime_entity_id
	 */
	setRuntimeEntityId(new_runtime_entity_id) {
		runtime_entity_id = new_runtime_entity_id;
	}

	/**
	 * It returns the window ID
	 * @returns {Number} The window ID
	 */
	getWindowID() {
		return window_id;
	}

	/**
	 * It returns the runtime entity ID
	 * @returns {String} The runtime entity ID
	 */
	getCoordinates() {
		return cords;
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
	 * @returns {String} The runtime entity id
	 */
	getRuntimeEntityId() {
		return runtime_entity_id;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
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
