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
export = ServerUpdateAttributesPacket;
declare class ServerUpdateAttributesPacket extends PacketConstructor {
	/**
	 * Sets the player ID
	 * @param {number} new_playerid
	 */
	setPlayerID(new_playerid: number): void;
	/**
	 * Returns the player ID
	 * @returns {number}
	 */
	getPlayerID(): number;
	/**
	 * Sets the attributes
	 * @param {Array<JSON>} attr
	 */
	setAttributes(attr: Array<JSON>): void;
	/**
	 * Returns the attributes
	 * @returns {Array<JSON>}
	 */
	getAttributes(): Array<JSON>;
	/**
	 * Sets the current tick
	 * @param {number} new_tick - The tick
	 */
	setTick(new_tick: number): void;
	/**
	 * Returns the current tick
	 * @returns {number};
	 */
	getTick(): number;
	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
