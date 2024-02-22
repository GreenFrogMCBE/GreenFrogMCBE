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
const { EventEmitter, Event } = require("@kotinash/better-events")

const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket")

class Generator {
	/**
	 * @type {import("Frog").WorldGenerator | undefined}
	 */
	name

    /**
	 * @type {World}
     */
	world

	/**
	 * @returns {Buffer | null}
	 */
	get_chunk_data() {
		return null
	}

	/**
	 * @param {import("Frog").Player} player
	 */
	generate(player) {
		EventEmitter.emit(
			new Event(
				"worldGenerate",
				{
					world: this
				}
			)
		)

		const chunk_radius = player.world.render_distance

		for (let x = player.location.x - chunk_radius; x <= player.location.x + chunk_radius; x++) {
			for (let z = player.location.z - chunk_radius; z <= player.location.z + chunk_radius; z++) {
				const level_chunk = new ServerLevelChunkPacket()
				level_chunk.x = x
				level_chunk.z = z
				level_chunk.sub_chunk_count = 1
				level_chunk.cache_enabled = false
				level_chunk.payload = this.get_chunk_data()
				level_chunk.write_packet(player)
			}
		}
	}
}

module.exports = Generator
