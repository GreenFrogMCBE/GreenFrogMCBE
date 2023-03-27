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
export = ServerUpdateAttributesPacket;
declare class ServerUpdateAttributesPacket extends PacketConstructor {
	/**
	 * Sets the player ID
	 * @param {Number} new_playerid
	 */
	setPlayerID(new_playerid: number): void;
	/**
	 * Returns the player ID
	 * @returns {Number}
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
	 * @param {Number} new_tick - The tick
	 */
	setTick(new_tick: number): void;
	/**
	 * Returns the current tick
	 * @returns {Number};
	 */
	getTick(): number;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
