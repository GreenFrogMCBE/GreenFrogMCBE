const Frog = require("../../Frog");

const PacketConstructor = require("./PacketConstructor");

class ClientMovePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string} The name of the packet
	 */
	getPacketName() {
		return "player_auth_input";
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
	 * 
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		const { x, y, z } = packet.data.params.position
		const { pitch, yaw } = packet.data.params

		if (player.x == x && player.y == y && player.z == z && player.yaw == yaw && player.pitch == pitch) return

		player.x = x;
		player.y = y;
		player.z = z;
		player.pitch = pitch;
		player.yaw = yaw;

		Frog.eventEmitter.emit('playerMove', {
			player,
			server,
			x,
			y,
			z,
			pitch,
			yaw,
			legacyPacket: false,
			cancel() {
				if (player.x === 0 && player.y === 0 && player.z === 0) return

				player.teleport(player.x, player.y, player.z)
			}
		})
	}
}

module.exports = ClientMovePacket