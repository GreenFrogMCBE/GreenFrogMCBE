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
const PacketConstructor = require("./PacketConstructor");

const PlayerMoveEvent = require("../../events/PlayerMoveEvent");

class ClientMovePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "move_player";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from player
	 * @param {any} player
	 * @param {JSON} packet
	 * @param {any} server
	 */
	async readPacket(player, packet, server) {
		await this.validatePacket(player);

		let position = packet.data.params.position;

		if (this.player.x 
			&& this.player.y
			&& this.player.z
			&& this.player.x == this.position.x
			&& this.player.y == this.position.y
			&& this.player.z == this.position.z) {
				throw new Error("Invalid position packet!")
		}

		const playerMoveEvent = new PlayerMoveEvent();
		playerMoveEvent.player = player;
		playerMoveEvent.server = server;
		playerMoveEvent.position = position;
		playerMoveEvent.execute();
	}
}

module.exports = ClientMovePacket;
