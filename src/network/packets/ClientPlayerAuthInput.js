const Frog = require("../../Frog");
const PacketConstructor = require("./PacketConstructor");

class ClientMovePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
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

		player.queue('set_entity_motion', { runtime_entity_id: 0n, velocity: { x: 0, y: Math.floor(Math.random() * 5) - 10, z: 0 } })
		// player.queue('move_player', {
		// 	runtime_id: 0,
		// 	position: { x: 0, y: 101.62100219726562, z: 0 },
		// 	pitch: 0,
		// 	yaw: 0,
		// 	head_yaw: 0,
		// 	mode: 'teleport',
		// 	on_ground: true,
		// 	ridden_runtime_id: 0,
		// 	teleport: { cause: 'unknown', source_entity_type: 0 },
		// 	tick: 0n
		// })

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
			legacyPacket: false
		})
	}
}

module.exports = ClientMovePacket