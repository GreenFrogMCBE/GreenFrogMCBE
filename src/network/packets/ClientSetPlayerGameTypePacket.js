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

const Frog = require("../../Frog");

const PacketConstructor = require("./PacketConstructor");

const InvalidGamemodeException = require("../../utils/exceptions/InvalidGamemodeException");

const { getKey } = require("../../utils/Language");

class ClientSetPlayerGameTypePacket extends PacketConstructor {
	/**
	 * Returns packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "set_player_game_type";
	}

	/**
	 * Validates if packet
	 * @param {Client} player
	 */
	async validatePacket(player) {
		if (!player.op) throw new InvalidGamemodeException(getKey("exceptions.network.invalidGamemodePacket"));
	}

	/**
	 * Reads if packet from player
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		await this.validatePacket(player, packet);

		let shouldChange = true;

		const gamemode = packet.data.params.gamemode;

		Frog.eventEmitter.emit("playerChangeGamemodeRequest", {
			server,
			player,
			gamemode,
			cancel: () => {
				shouldChange = false;
			},
		});

		if (!shouldChange) return;

		player.setGamemode(gamemode);
	}
}

module.exports = ClientSetPlayerGameTypePacket;
