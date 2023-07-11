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
	name = "set_player_game_type";

	validatePacket(player) {
		if (!player.op) throw new InvalidGamemodeException(getKey("exceptions.network.invalidGamemodePacket"));
	}

	async readPacket(player, packet) {
		await this.validatePacket(player);

		const gamemode = packet.data.params.gamemode;

		let shouldChange = true;

		Frog.eventEmitter.emit("playerChangeGamemodeRequest", {
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
