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
const PlayerGamemodeChangeRequest = require("../../events/PlayerGamemodeChangeRequestEvent");

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
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async validatePacket(player, packet) {
		if (!packet.data.params.gamemode) throw new PacketHandlingError("Bad gamemode packet - Bad gamemode");

		if (!player.op) throw new PacketHandlingError("Bad gamemode packet - Tried to switch gamemode, while not opped");
	}

	/**
	 * Reads the packet from player
	 * @param {any} player
	 * @param {JSON} packet
	 * @param {any} server
	 */
	async readPacket(player, packet, server) {
		await this.validatePacket(player, packet);

		const gamemodeChangeEvent = new PlayerGamemodeChangeRequest();
		gamemodeChangeEvent.server = server;
		gamemodeChangeEvent.player = player;
		gamemodeChangeEvent.gamemode = packet.data.params.gamemode;
		gamemodeChangeEvent.execute();
	}
}

module.exports = ClientSetPlayerGameTypePacket;
