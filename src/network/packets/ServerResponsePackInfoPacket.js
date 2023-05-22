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
let must_accept = false;
let has_scripts = false;
let behavior_packs = [];
let texture_packs = [];

const PacketConstructor = require("./PacketConstructor");

class ServerResponsePackInfoPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "resource_packs_info";
	}

	/**
	 * Returns if the packet is critical??
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return true;
	}

	/**
	 * Sets if the client must accept the packet
	 * @param {boolean} new_must_accept
	 */
	setMustAccept(new_must_accept) {
		must_accept = new_must_accept;
	}

	/**
	 * Sets, if the resource pack has scripts
	 * @param {boolean} new_has_scripts
	 */
	setHasScripts(new_has_scripts) {
		has_scripts = new_has_scripts;
	}

	/**
	 * Sets the list of behavior packs
	 * @param {Array} new_behavior_packs
	 */
	setBehaviorPacks(new_behavior_packs) {
		behavior_packs = new_behavior_packs;
	}

	/**
	 * Sets the list of texture packs
	 * @param {Array} new_texture_packs
	 */
	setTexturePacks(new_texture_packs) {
		texture_packs = new_texture_packs;
	}

	/**
	 * Returns if the resource pack is forced to accept.
	 * @returns {boolean}
	 */
	getMustAccept() {
		return must_accept;
	}

	/**
	 * Returns if the resource pack has scripts.
	 * @returns {boolean}
	 */
	getHasScripts() {
		return has_scripts;
	}

	/**
	 * Returns the list of behavior packs.
	 * @returns {Array}
	 */
	getBehaviorPacks() {
		return behavior_packs;
	}

	/**
	 * Returns the list of texture packs.
	 * @returns {Array}
	 */
	getTexturePacks() {
		return texture_packs;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			must_accept: this.getMustAccept(),
			has_scripts: this.getHasScripts(),
			behaviour_packs: this.getBehaviorPacks(),
			texture_packs: this.getTexturePacks(),
		});
	}
}

module.exports = ServerResponsePackInfoPacket;
