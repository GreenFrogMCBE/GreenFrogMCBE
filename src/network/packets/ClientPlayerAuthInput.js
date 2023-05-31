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

const Falldamage = require("../../world/Falldamage");

const PacketConstructor = require("./PacketConstructor");

class ClientMovePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "player_auth_input";
	}

	/**
	 * Reads the packet from player
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		const { x, y, z } = packet.data.params.position;
		const { pitch, yaw } = packet.data.params;

		if (player.x == x && player.y == y && player.z == z && player.yaw == yaw && player.pitch == pitch) return;

		let shouldSetPosition = true;

		Frog.eventEmitter.emit("playerMove", {
			player,
			server,
			x,
			y,
			z,
			pitch,
			yaw,
			onGround: player.location.onGround,
			cancel: () => {
				if (player.location.x === 0 && player.location.y === 0 && player.location.z === 0) return;

				player.teleport(player.location.x, player.location.y, player.location.z);

				shouldSetPosition = false;
			},
		});

		if (!shouldSetPosition) return;

		Falldamage.calculateFalldamage(player, { x, y, z });
		Falldamage.calculateHungerloss(player);

		player.location.x = x;
		player.location.y = y;
		player.location.z = z;
		player.location.yaw = yaw;
		player.location.pitch = pitch;
	}
}

module.exports = ClientMovePacket;
