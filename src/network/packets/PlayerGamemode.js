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

const Gamemode = require("../../player/GameMode");

let gamemode = Gamemode.FALLBACK;

class PlayerGamemode extends require("./Packet") {
	/**
	 * @returns The name of the packet.
	 */
	name() {
		return "set_player_game_type";
	}

	/**
	 * It sets the gamemode.
	 * @param gamemode1 - The gamemode.
	 */
	setGamemode(gamemode1) {
		gamemode = gamemode1;
	}

	/**
	 * It returns the gamemode
	 * @returns The gamemode
	 */
	getGamemode() {
		return gamemode;
	}

	send(client) {
		client.queue(this.name(), {
			gamemode: this.getGamemode(),
		});
	}
}

module.exports = PlayerGamemode;
