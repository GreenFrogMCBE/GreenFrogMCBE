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
export = ServerSetPlayerGameTypePacket;
declare class ServerSetPlayerGameTypePacket extends PacketConstructor {
	/**
	 * Sets the gamemode.
	 * @param {Gamemode} gamemode1 The gamemode to be set.
	 */
	setGamemode(gamemode1: { readonly CREATIVE: "creative"; readonly SURVIVAL: "survival"; readonly SPECTATOR: "spectator"; readonly CREATIVESPECTATOR: any; readonly SURVIVALSPECTATOR: any; readonly ADVENTURE: "adventure"; readonly FALLBACK: "fallback" }): void;
	/**
	 * Returns the current gamemode.
	 * @returns {Gamemode} The current gamemode.
	 */
	getGamemode(): {
		readonly CREATIVE: "creative";
		readonly SURVIVAL: "survival";
		readonly SPECTATOR: "spectator";
		readonly CREATIVESPECTATOR: any;
		readonly SURVIVALSPECTATOR: any;
		readonly ADVENTURE: "adventure";
		readonly FALLBACK: "fallback";
	};
	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
