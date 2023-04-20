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
const Frog = require("../../Frog");

const Falldamage = require("../../world/Falldamage");

const PacketConstructor = require("./PacketConstructor");

class ClientMovePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "move_player";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from player
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		const { x, y, z } = packet.data.params.position;
		const { pitch, yaw, on_ground } = packet.data.params;

		player.on_ground = on_ground;

		Falldamage.calculateFalldamage(player, { x, y, z });
		Falldamage.calculateHungerloss(player);

		Frog.eventEmitter.emit("playerMove", {
			player,
			server,
			x,
			y,
			z,
			pitch,
			yaw,
			legacyPacket: false,
			onGround: player.onGround,
			cancel: () => {
				if (player.x === 0 && player.y === 0 && player.z === 0) return;

				player.teleport(player.x, player.y, player.z);
			},
		});
	}
}

module.exports = ClientMovePacket;
