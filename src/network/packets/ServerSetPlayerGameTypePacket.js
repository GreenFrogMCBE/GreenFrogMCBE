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

const Gamemode = require("../../api/player/GameMode");

const PacketConstructor = require("./PacketConstructor");

let gamemode = Gamemode.FALLBACK;

class ServerSetPlayerGameTypePacket extends PacketConstructor {
	/**
	 * Returns the packet name.
	 * @returns {string} The name of the packet.
	 */
	getPacketName() {
		return "set_player_game_type";
	}

	/**
	 * Returns whether the packet is critical.
	 * @returns {boolean} Returns if the packet is critical.
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the gamemode.
	 * @param {GameMode} gamemode1 The gamemode to be set.
	 */
	setGamemode(gamemode1) {
		gamemode = gamemode1;
	}

	/**
	 * Returns the current gamemode.
	 * @returns {GameMode} The current gamemode.
	 */
	getGamemode() {
		return gamemode;
	}

	/**
	 * Sends the packet to the client
	 * 
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			gamemode: this.getGamemode(),
		});
	}
}

module.exports = ServerSetPlayerGameTypePacket;
