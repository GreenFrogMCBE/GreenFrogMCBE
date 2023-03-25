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
export = ServerChangeDimensionPacket;
declare class ServerChangeDimensionPacket extends PacketConstructor {
	/**
	 * Sets the dimension
	 * @param {Dimensions} new_dimension
	 */
	setDimension(new_dimension: { OVERWORLD: number; NETHER: number; END: number }): void;
	/**
	 * Sets the spawn position
	 * @param {Float} x
	 * @param {Float} y
	 * @param {Float} z
	 */
	setPosition(x: Float, y: Float, z: Float): void;
	/**
	 * Sets if the player needs to be respawned after the dimension change (default = false)
	 * @param {boolean} needs_respawn
	 */
	setRespawn(needs_respawn: boolean): void;
	/**
	 * Returns the dimension
	 * @returns {Dimensions} The dimension
	 */
	getDimension(): {
		OVERWORLD: number;
		NETHER: number;
		END: number;
	};
	/**
	 * Returns if the player needs the be respawned
	 * @returns {Boolean} If the player needs to be respawned
	 */
	getRespawn(): boolean;
	/**
	 * Returns the position of the player
	 * @returns {JSON} The position of the player
	 */
	getPosition(): JSON;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
