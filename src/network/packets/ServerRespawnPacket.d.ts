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
export = ServerRespawnPacket;
declare class ServerRespawnPacket extends PacketConstructor {
	/**
	 * Returns the position.
	 * @returns {JSON} The position.
	 */
	getPosition(): JSON;
	/**
	 * Returns the packet state.
	 * @returns {String} The state.
	 */
	getState(): string;
	/**
	 * Returns the runtime entity id.
	 * @returns {Number} The runtime entity id.
	 */
	getRuntimeEntityId(): number;
	/**
	 * Sets the respawn position.
	 * @param {Number} x - The X coordinate.
	 * @param {Number} y - The Y coordinate.
	 * @param {Number} z - The Z coordinate.
	 */
	setPosition(x: number, y: number, z: number): void;
	/**
	 * Sets the packet state.
	 * @param {Number} new_packet_state
	 */
	setState(new_packet_state: number): void;
	/**
	 * Sets the runtime entity id
	 * @param {Number} new_id
	 */
	setRuntimeEntityId(new_id: number): void;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
