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
export = ServerUpdateBlockPacket;
declare class ServerUpdateBlockPacket extends PacketConstructor {
	/** @type {number} */
	x: number;
	/** @type {number} */
	y: number;
	/** @type {number} */
	z: number;
	/** @type {number} */
	block_runtime_id: number;
	/** @type {boolean} */
	neighbors: boolean;
	/** @type {boolean} */
	network: boolean;
	/** @type {boolean} */
	no_graphic: boolean;
	/** @type {boolean} */
	unused: boolean;
	/** @type {boolean} */
	priority: boolean;
	/** @type {number} */
	layer: number;
	/** @type {number} */
	flags_value: number;
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
