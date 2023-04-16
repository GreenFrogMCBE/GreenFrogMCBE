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
//const PlayerGamemodeChangeRequest = require("../../events/PlayerGamemodeChangeRequestEvent");

const Frog = require("../../Frog");
const PacketConstructor = require("./PacketConstructor");

const PacketHandlingError = require("./exceptions/PacketHandlingError");

class ClientSetPlayerGameTypePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "set_player_game_type";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Validates the packet
	 * @param {Client} player
	 * @param {JSON} packet
	 */
	async validatePacket(player, packet) {
		if (!packet.data.params.gamemode) throw new PacketHandlingError("Bad gamemode packet - Bad gamemode");

		if (!player.op) throw new PacketHandlingError("Bad gamemode packet - Tried to switch gamemode, while not opped");
	}

	/**
	 * Reads the packet from player
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		await this.validatePacket(player, packet);

		let shouldChange = true;
		const gamemode = packet.data.params.gamemode

		Frog.eventEmitter.emit('playerChangeGamemodeRequest', {
			server,
			player,
			gamemode,
			cancel() {
				shouldChange = false
			}
		})

		if (!shouldChange) return

		player.setGamemode(gamemode)
	}
}

module.exports = ClientSetPlayerGameTypePacket;
