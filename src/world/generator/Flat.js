const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");
const WorldGenerators = require("../types/WorldGenerators");
const Generator = require("./Generator");

class Flat extends Generator {
	getName() {
		return WorldGenerators.FLAT;
	}

	generate(player) {
		const chunkData = Buffer.alloc(16 * 16 * 256);

		for (let y = 0; y < 256; y++) {
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x;

					if (y < 20 && x < 5) {
						chunkData[index] = 2
					} else {
						chunkData[index] = 3
					}
				}
			}
		}

		const chunkRadius = player.world.getChunkRadius();

		for (let x = player.location.x - chunkRadius; x <= player.location.x + chunkRadius; x++) {
			for (let z = player.location.z - chunkRadius; z <= player.location.z + chunkRadius; z++) {
				const levelChunk = new ServerLevelChunkPacket();
				levelChunk.setX(x);
				levelChunk.setZ(z);
				levelChunk.setSubChunkCount(1);
				levelChunk.setCacheEnabled(false);
				levelChunk.setPayload(chunkData);
				levelChunk.writePacket(player);
			}
		}
	}
}

module.exports = Flat;
