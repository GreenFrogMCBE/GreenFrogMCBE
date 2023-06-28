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

const FallDamage = require("../../world/FallDamage");

const PacketConstructor = require("./PacketConstructor");

class ClientMovePacket extends PacketConstructor {
	name = 'move_player';

	async readPacket(player, packet, server) {
		const { x, y, z } = packet.data.params.position;
		const { pitch, yaw, on_ground } = packet.data.params;

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

		FallDamage.calculateFallDamage(player, { x, y, z });

		player.location.x = x;
		player.location.y = y;
		player.location.z = z;
		player.location.yaw = yaw;
		player.location.pitch = pitch;
		player.location.onGround = on_ground;
	}
}

module.exports = ClientMovePacket;
