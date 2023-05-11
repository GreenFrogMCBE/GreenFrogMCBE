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
export = ServerScoreboardObjectivePacket;
declare class ServerScoreboardObjectivePacket extends PacketConstructor {
	/**
	 * Sets the display slot.
	 * @param {DisplaySlots} slot The display slot to set.
	 */
	setDisplaySlot(slot: { readonly LIST: "list"; readonly SIDEBAR: "sidebar"; readonly BELOWNAME: "belowname" }): void;
	/**
	 * Sets the objective name.
	 * @param {string} name The objective name to set.
	 */
	setObjectiveName(name: string): void;
	/**
	 * Sets the display name.
	 * @param {string} name The display name to set.
	 */
	setDisplayName(name: string): void;
	/**
	 * Sets the criteria name.
	 * @param {string} name The criteria name to set.
	 */
	setCriteriaName(name: string): void;
	/**
	 * Sets the sort order.
	 * @param {number} order The sort order to set.
	 */
	setSortOrder(order: number): void;
	/**
	 * Returns the display slot.
	 * @returns {DisplaySlots} The display slot.
	 */
	getDisplaySlot(): {
		readonly LIST: "list";
		readonly SIDEBAR: "sidebar";
		readonly BELOWNAME: "belowname";
	};
	/**
	 * Returns the objective name.
	 * @returns {string} The objective name.
	 */
	getObjectiveName(): string;
	/**
	 * Returns the display name.
	 * @returns {string} The display name.
	 */
	getDisplayName(): string;
	/**
	 * Returns the criteria name.
	 * @returns {string} The criteria name.
	 */
	getCriteriaName(): string;
	/**
	 * Returns the sort order.
	 * @returns {number} The sort order.
	 */
	getSortOrder(): number;
	/**
	 * Sends the packet to the client.
	 * @param {Client} client
	 */
	writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
