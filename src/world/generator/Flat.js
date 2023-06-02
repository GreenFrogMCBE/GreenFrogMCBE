const Air = require("../../block/normalIds/Air");
const Dirt = require("../../block/normalIds/Dirt");
const Grass = require("../../block/normalIds/Grass");
const Bedrock = require("../../block/normalIds/Bedrock");

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
						chunkData[index] = new Grass().getID();
					} else if (y < 18 && x < 11) {
						chunkData[index] = new Air().getID();
					} else if (y < 17 && x < 12) {
						chunkData[index] = new Bedrock().getID();
					} else {
						chunkData[index] = new Dirt().getID();
					}
				}
			}
		}

		return chunkData
	}
}

module.exports = Flat;
