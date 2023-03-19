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
const assert = require('assert')
const PacketConstructor = require("./PacketConstructor");

let time = 0;

class Time extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "update_time";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * @param client - The client that sent the packet
	 * @param time - The time in seconds to set the client's time to.
	 */
	validate(time) {
		assert(parseInt(time), NaN)
	}

	/**
	 * It updates the time
	 * @param {Number} time - The time in seconds to set the client's time to.
	 */
	setTime(time1) {
		this.validate(time1);

		time = time1;
	}

	/**
	 * It returns the time
	 * @returns The time
	 */
	getTime() {
		return time;
	}

	/**
	 * @param {Object} client - The client that the packet is being sent to.
	 */
	writePacket(client) {
		this.validate(time);
		client.queue(this.name(), {
			time: this.getTime(),
		});
	}
}

module.exports = Time;
