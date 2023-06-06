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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Bedrock = require("../../block/normalIds/Bedrock");
const CoalOre = require("../../block/normalIds/CoalOre");
const Grass = require("../../block/normalIds/Grass");
const Stone = require("../../block/normalIds/Stone");
const Dirt = require("../../block/normalIds/Dirt");
const Air = require("../../block/normalIds/Air");

const WorldGenerators = require("../types/WorldGenerators");

const Generator = require("./Generator");

/** @private @type {number} */
const dirt = new Dirt().getID()
/** @private @type {number} */
const grass = new Grass().getID()
/** @private @type {number} */
const air = new Air().getID()
/** @private @type {number} */
const bedrock = new Bedrock().getID()
/** @private @type {number} */
const stone = new Stone().getID()

/** @private @type {Buffer} */
let chunkData;
/** @private @type {number} */
let blockCount = 0;

/**
 * @param {number} blockType
 * @private
 */
function _generateOre() {
	let blockType;

	if (Math.floor(Math.random() * 100) < 30) {
		blockType = new CoalOre().getID();
	} else {
		blockType = stone;
	}

	return blockType;
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
		chunkData = Buffer.alloc(16 * 256 * 16);

		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 256; y++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x;

					blockCount++;

					if (x > 14 && y > -1 && y < 16) {
						if (chunkData[index] == !dirt) {
							// Holes

							if (Math.floor(Math.random() * 3000) < 1) {
								chunkData[index - 1] = air;
							} else {
								chunkData[index - 1] = grass;
							}
						}
					} else {
						// Hills

						if (Math.floor(Math.random() * 600) < 1 && blockCount > 4161319 && !chunkData[index]) {
							for (let i = 0; i < 1200; i++) {
								if ((index - i) % 2 === 0 && y > 15) {
									if (!chunkData[index - i]) {
										chunkData[index - i] = grass;
									}

									if (!chunkData[index - 351 - i]) {
										chunkData[index - 351 - i] = grass;
									}

									if (!chunkData[index + 351 + i]) {
										chunkData[index + 351 + i] = grass;
									}
								}
							}
						} else {
							chunkData[index] = stone;
						}

						for (let i = 1; i <= 5; i++) {
							chunkData[index - i] = _generateOre();
						}

						if (chunkData[index] == !grass) {
							chunkData[index] = air;
						}

						chunkData[index - 1] = dirt;

						if (chunkData[index + 1] === bedrock) {
							chunkData[index + 1] = air;
						}

						if (chunkData[index + 2] === bedrock) {
							chunkData[index + 2] = air;
						}

						// Bedrock generator
						chunkData[index - 9] = stone;
						chunkData[index - 10] = stone;
						chunkData[index - 12] = bedrock;
					}
				}
			}
		}

		return chunkData;
	}
}

module.exports = Default;
