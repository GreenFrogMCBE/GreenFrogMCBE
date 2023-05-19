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

					if (y > 13 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 12 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 11 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 10 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 9 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 8 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 7 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 6 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 5 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 4 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 3 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 2 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 1 && x > 14) {
						chunkData[index] = 2;
					} else if (y > 0 && x > 14) {
						chunkData[index] = 2;
					} else if (y > -1 && x > 14) {
						chunkData[index] = 2;
					} else if (y < 18 && x < 11) {
						chunkData[index] = 0
					} else if (y < 17 && x < 12) {
						chunkData[index] = 7
					} else {
						chunkData[index] = 3; // Dirt blocks for other layers
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
