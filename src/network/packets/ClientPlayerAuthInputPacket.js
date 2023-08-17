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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../../Frog");

const Packet = require("./Packet");

class ClientPlayerAuthInputPacket extends Packet {
	name = "player_auth_input";

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async readPacket(player, packet) {
		const { x, y, z } = packet.data.params.position;
		const { pitch, yaw } = packet.data.params;
		const fixedY = y - 2;

		if (player.location.x === x && player.location.y === fixedY && player.location.z === z) return;

		let shouldSetPosition = true;

		Frog.eventEmitter.emit("playerMove", {
			player,
			x,
			y: fixedY,
			z,
			pitch,
			yaw,
			onGround: player.location.onGround,
			cancel: () => {
				player.teleport(player.location.x, y, player.location.z);

				shouldSetPosition = false;
			},
		});

		if (!shouldSetPosition) return;

		player.world.handleFallDamage(player, { x, y, z });

		player.location.x = x;
		player.location.y = fixedY;
		player.location.z = z;
		player.location.yaw = yaw;
		player.location.pitch = pitch;
		player.location.onGround = false;
	}
}

module.exports = ClientPlayerAuthInputPacket;
