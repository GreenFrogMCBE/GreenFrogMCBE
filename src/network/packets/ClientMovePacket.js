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
const Frog = require("../../Frog")

const Packet = require("./Packet")

class ClientMovePacket extends Packet {
	name = "move_player"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		const { x, y, z } = packet.data.params.position
		const { pitch, yaw, on_ground } = packet.data.params
		const fixedY = y - 2

		if (player.location.x === x && player.location.y === fixedY && player.location.z === z && player.location.yaw === yaw && player.location.pitch === pitch) return

		let shouldSetPosition = true

		Frog.event_emitter.emit("playerMove", {
			player,
			x,
			y: fixedY,
			z,
			pitch,
			yaw,
			onGround: player.location.onGround,
			cancel: () => {
				player.teleport(player.location.x, y, player.location.z)

				shouldSetPosition = false
			},
		})

		if (!shouldSetPosition) return

		player.world.handle_fall_damage(player, { x, y, z })

		player.location.x = x
		player.location.y = fixedY
		player.location.z = z
		player.location.yaw = yaw
		player.location.pitch = pitch
		player.location.onGround = on_ground
	}
}

module.exports = ClientMovePacket
