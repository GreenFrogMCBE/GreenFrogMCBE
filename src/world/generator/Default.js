const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");

const WorldGenerators = require("../types/WorldGenerators");

const Generator = require("./Generator");

let chunkData;

/**
 * @param {number} blockType 
 * @private
 */
function _generateHole() {
	let blockType;

	if (Math.floor(Math.random() * 300) < 1) {
		blockType = 0;
	} else {
		blockType = 2;
	}

	return blockType
}


/**
 * @param {number} blockType 
 * @private
 */
function _generateOre() {
	let blockType;

	if (Math.floor(Math.random() * 100) < 30) {
		blockType = 16;
	} else {
		blockType = 1;
	}

	return blockType
}

class Default extends Generator {
	/**
	 * @returns {WorldGenerators.Flat} 
	 */
	getName() {
		return WorldGenerators.FLAT;
	}

	/**
	 * @returns {Buffer} 
	 */
	getChunkData() {
		chunkData = Buffer.alloc(16 * 16 * 256);

		for (let y = 0; y < 256; y++) {
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x;

					if (x > 14 && y > -1 && y < 16) {
						chunkData[index] = _generateHole();
					} else if (y < 17 && x < 11) {
						chunkData[index] = 0
					} else {
						if (chunkData[index] % 2 === 0) {
							chunkData[index] = _generateOre()
							chunkData[index + 1] = 3
							chunkData[index - 2] = _generateOre()
							chunkData[index - 1] = _generateOre()
						}
					}
				}
			}
		}

		return chunkData;
	}

	generate(player) {
		const chunkRadius = player.world.getChunkRadius();

		for (let x = player.location.x - chunkRadius; x <= player.location.x + chunkRadius; x++) {
			for (let z = player.location.z - chunkRadius; z <= player.location.z + chunkRadius; z++) {
				const levelChunk = new ServerLevelChunkPacket();
				levelChunk.setX(x);
				levelChunk.setZ(z);
				levelChunk.setSubChunkCount(1);
				levelChunk.setCacheEnabled(false);
				levelChunk.setPayload(this.getChunkData());
				levelChunk.writePacket(player);
			}
		}
	}
}

module.exports = Default;
