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
export = ServerResourcePackStackPacket;
declare class ServerResourcePackStackPacket extends PacketConstructor {
	/**
	 * Sets if the client must accept the packet
	 * @param {Boolean} new_must_accept
	 */
	setMustAccept(new_must_accept: boolean): void;
	/**
	 * Sets the list of behavior packs
	 * @param {Array} new_behavior_packs - The behavior packs
	 */
	setBehaviorPacks(new_behavior_packs: Array): void;
	/**
	 * Sets the list of resource packs
	 * @param {Array} new_resource_packs - The resource packs
	 */
	setResourcePacks(new_resource_packs: Array): void;
	/**
	 * Sets the game version
	 * @param {String} new_game_version - The game version
	 */
	setGameVersion(new_game_version: string): void;
	/**
	 * Sets the experiments
	 * @param {Array} new_experiments - The experiments used
	 */
	setExperiments(new_experiments: Array): void;
	/**
	 * Sets the if the experiments were previously used
	 * @param {Boolean} new_experiments_previously_used
	 */
	setExperimentsPreviouslyUsed(new_experiments_previously_used: boolean): void;
	/**
	 * Returns the if the client must accept the packet
	 * @returns {Boolean}
	 */
	getMustAccept(): boolean;
	/**
	 * Returns the list of behavior packs
	 * @returns {Array}
	 */
	getBehaviorPacks(): Array;
	/**
	 * Returns the list of resource packs
	 * @returns {Array}
	 */
	getResourcePacks(): Array;
	/**
	 * Returns the game version that the resource pack was made for
	 * @returns {String}
	 */
	getGameVersion(): string;
	/**
	 * Returns the experiments that were used
	 * @returns {Array}
	 */
	getExperiments(): Array;
	/**
	 * Returns if the experiments were previously used
	 * @returns {Boolean}
	 */
	getExperimentsPreviouslyUsed(): boolean;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
