/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const PacketConstructor = require("./PacketConstructor");

let id = -1;
let attributes = null;
let tick = -1;

class ServerUpdateAttributesPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string}
	 */
	getPacketName() {
		return "update_attributes";
	}

	/**
	 * Sets the player ID
	 * @param {number} new_playerid
	 */
	setPlayerId(new_playerid) {
		id = new_playerid;
	}

	/**
	 * Returns the player ID
	 * @returns {number}
	 */
	getPlayerId() {
		return id;
	}

	/**
	 * Sets the attributes
	 * @param {Array<JSON>} attribute
	 */
	setAttributes(attribute) {
		attributes = attribute;
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
	 * @param {number} new_tick - The tick
	 */
	setTick(new_tick) {
		tick = new_tick;
	}

	/**
	 * Returns the current tick
	 * @returns {number};
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
			runtime_entity_id: `${this.getPlayerId()}`,
			attributes: this.getAttributes(),
			tick: this.getTick(),
		});
	}
}

module.exports = ServerUpdateAttributesPacket;
