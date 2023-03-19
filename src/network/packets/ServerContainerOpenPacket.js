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

const PacketConstructor = require('./PacketConstructor')

class ContainerOpen extends PacketConstructor {
	/**
 	 * Returns the packet name
 	 * @returns The name of the packet
 	*/
	getPacketName() {
		return "container_open";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * It sets the coordinates
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
	 * It sets the window type
	 * @param {WindowType} window_type
	 */
	setWindowType(window_type1) {
		window_type = window_type1;
	}

	/**
	 * It sets the runtime entity id
	 * This must be a string
	 * @param {String} runtime_entity_id1
	 */
	setRuntimeEntityId(runtime_entity_id1) {
		runtime_entity_id = runtime_entity_id1;
	}

	/**
	 * It returns the window id
	 * @returns {String} The window id
	 */
	getWindowId() {
		return window_id;
	}

	/**
	 * It returns the runtime entity id
	 * @returns {JSON} The runtime entity id
	 */
	getCoordinates() {
		return cords;
	}

	/**
	 * It returns the window type
	 * @returns {WindowType} The window type
	 */
	getWindowType() {
		return window_type;
	}

	/**
	 * It returns the runtime entity id
	 * @returns {String} The runtime entity id
	 */
	getRuntimeEntityId() {
		return runtime_entity_id;
	}

	/**
	 * It writePackets the packet
	 * @param {Object} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			window_id: this.getWindowId(),
			window_type: this.getWindowType(),
			coordinates: this.getCoordinates(),
			runtime_entity_id: this.getRuntimeEntityId(),
		});
	}
}

module.exports = ContainerOpen;
