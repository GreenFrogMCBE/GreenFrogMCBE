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

let value = {};
let properties = {};
let tick;
let runtime_entity_id;

class ServerSetEntityDataPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "set_entity_data";
	}

	/**
	 * Returns if the packet is critical??
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the field value for the player
	 * @param {string} field
	 * @param {boolean} new_value
	 */
	setValue(field, new_value) {
		value[field] = new_value;
	}

	/**
	 * Returns the field value
	 * @returns {JSON}
	 */
	getFieldValue() {
		return value;
	}

	/**
	 * Sets properties for the packet
	 * @param {JSON} new_properties
	 */
	setProperties(new_properties) {
		properties = new_properties;
	}

	/**
	 * Returns the properties of the packet
	 * @returns {JSON}
	 */
	getProperties() {
		return properties;
	}

	/**
	 * Sets the current tick
	 * @param {number} new_tick
	 */
	setTick(new_tick) {
		tick = new_tick;
	}

	/**
	 * Returns the current tick
	 * @returns {number}
	 */
	getTick() {
		return tick;
	}

	/**
	 * Sets the runtime_entity_id
	 * @param {string} new_runtime_entity_id
	 */
	setRuntimeEntityID(new_runtime_entity_id) {
		runtime_entity_id = new_runtime_entity_id;
	}

	/**
	 * Returns the runtime entity ID of the entity.
	 * @returns {string}
	 */
	getRuntimeEntityID() {
		return runtime_entity_id;
	}

	writePacket(client) {
		client.queue(this.getPacketName(), {
			runtime_entity_id: this.getRuntimeEntityID(),
			metadata: [
				{
					key: "flags",
					type: "long",
					value: this.getFieldValue(),
				},
			],
			properties: this.getProperties(),
			tick: this.getTick(),
		});
	}
}

module.exports = ServerSetEntityDataPacket;
