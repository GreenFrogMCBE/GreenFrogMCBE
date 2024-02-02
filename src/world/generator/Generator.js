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

const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket")

class Generator {
	/**
	 * @type {import("Frog").WorldGenerator | undefined}
	 */
	name

	/**
	 * @returns {Buffer | null}
	 */
	getChunkData() {
		return null
	}

	/**
	 * @param {import("Frog").Player} player
	 */
	generate(player) {
		let shouldGenerateWorld = true

		Frog.eventEmitter.emit("worldGenerate", {
			player,
			cancel() {
				shouldGenerateWorld = false
			}
		})

		if (!shouldGenerateWorld) return

		const chunkRadius = player.world.renderDistance

		for (let x = player.location.x - chunkRadius; x <= player.location.x + chunkRadius; x++) {
			for (let z = player.location.z - chunkRadius; z <= player.location.z + chunkRadius; z++) {
				const levelChunk = new ServerLevelChunkPacket()
				levelChunk.x = x
				levelChunk.z = z
				levelChunk.sub_chunk_count = 1
				levelChunk.cache_enabled = false
				levelChunk.payload = this.getChunkData()
				levelChunk.writePacket(player)
			}
		}
	}
}

module.exports = Generator
