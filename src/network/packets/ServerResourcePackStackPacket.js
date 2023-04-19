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
let must_accept = false;
let behavior_packs = [];
let resource_packs = [];
let game_version;
let experiments = [];
let experiments_previously_used = false;

const PacketConstructor = require("./PacketConstructor");

class ServerResourcePackStackPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "resource_pack_stack";
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
	 * Sets the list of behavior packs
	 * @param {Array} new_behavior_packs - The behavior packs
	 */
	setBehaviorPacks(new_behavior_packs) {
		behavior_packs = new_behavior_packs;
	}

	/**
	 * Sets the list of resource packs
	 * @param {Array} new_resource_packs - The resource packs
	 */
	setResourcePacks(new_resource_packs) {
		resource_packs = new_resource_packs;
	}

	/**
	 * Sets the game version
	 * @param {string} new_game_version - The game version
	 */
	setGameVersion(new_game_version) {
		game_version = new_game_version;
	}

	/**
	 * Sets the experiments
	 * @param {Array} new_experiments - The experiments used
	 */
	setExperiments(new_experiments) {
		experiments = new_experiments;
	}

	/**
	 * Sets the if the experiments were previously used
	 * @param {boolean} new_experiments_previously_used
	 */
	setExperimentsPreviouslyUsed(new_experiments_previously_used) {
		experiments_previously_used = new_experiments_previously_used;
	}

	/**
	 * Returns the if the client must accept the packet
	 * @returns {boolean}
	 */
	getMustAccept() {
		return must_accept;
	}

	/**
	 * Returns the list of behavior packs
	 * @returns {Array}
	 */
	getBehaviorPacks() {
		return behavior_packs;
	}

	/**
	 * Returns the list of resource packs
	 * @returns {Array}
	 */
	getResourcePacks() {
		return resource_packs;
	}

	/**
	 * Returns the game version that the resource pack was made for
	 * @returns {string}
	 */
	getGameVersion() {
		return game_version;
	}

	/**
	 * Returns the experiments that were used
	 * @returns {Array}
	 */
	getExperiments() {
		return experiments;
	}

	/**
	 * Returns if the experiments were previously used
	 * @returns {boolean}
	 */
	getExperimentsPreviouslyUsed() {
		return experiments_previously_used;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			must_accept: this.getMustAccept(),
			behavior_packs: this.getBehaviorPacks(),
			resource_packs: this.getResourcePacks(),
			game_version: this.getGameVersion(),
			experiments: this.getExperiments(),
			experiments_previously_used: this.getExperimentsPreviouslyUsed(),
		});
	}
}

module.exports = ServerResourcePackStackPacket;
