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

let patterns = [];
let materials = [];

class ServerTrimDataPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string}
	 */
	getPacketName() {
		return "trim_data";
	}

	/**
	 * Sets the patterns
	 * @param {Array<JSON>} new_patterns
	 */
	setPatterns(new_patterns) {
		patterns = new_patterns;
	}

	/**
	 * Returns the patterns
	 * @returns {JSON}
	 */
	getPatterns() {
		return patterns;
	}

	/**
	 * Sets the materials
	 * @param {Array<JSON>} material
	 */
	setMaterials(material) {
		materials = material;
	}

	/**
	 * Returns the materials
	 * @returns {Array<JSON>}
	 */
	getMaterials() {
		return materials;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			patterns: this.getPatterns(),
            materials: this.getMaterials()
		});
	}
}

module.exports = ServerTrimDataPacket;
