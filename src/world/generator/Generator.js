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
 * @link Github - https://github.com/aboxofrats/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const { Client } = require("frog-protocol");

const Frog = require("../../Frog");

const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");

class Generator {
	/**
	 * @returns {WorldGenerator}
	 * @type {import('../types/WorldGenerator')}
	 */
	name;

	/**
	 * @returns {Buffer}
	 */
	getChunkData() {
		return null;
	}

	/**
	 * @param {Client} player
	 */
	generate(player) {
		Frog.eventEmitter.emit("generatorGeneratingWorld", { player, server: Frog.getServer() });

		const chunkRadius = player.world.renderDistance;

		for (let x = player.location.x - chunkRadius; x <= player.location.x + chunkRadius; x++) {
			for (let z = player.location.z - chunkRadius; z <= player.location.z + chunkRadius; z++) {
				const levelChunk = new ServerLevelChunkPacket();
				levelChunk.x = x;
				levelChunk.z = z;
				levelChunk.sub_chunk_count = 1;
				levelChunk.cache_enabled = false;
				levelChunk.payload = this.getChunkData();
				levelChunk.writePacket(player);
			}
		}
	}
}

module.exports = Generator;
