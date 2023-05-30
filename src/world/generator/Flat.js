const WorldGenerators = require("../types/WorldGenerators");

const Generator = require("./Generator");

let chunkData;

class Flat extends Generator {
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
		chunkData = Buffer.alloc(16 * 256 * 16);

		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 256; y++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x;

					if (x > 14 && y > -1 && y < 16) {
						chunkData[index] = 2;
					} else if (y < 18 && x < 11) {
						chunkData[index] = 0;
					} else if (y < 17 && x < 12) {
						chunkData[index] = 7;
					} else {
						chunkData[index] = 3;
					}
				}
			}
		}

		return chunkData
	}
}

module.exports = Flat;
