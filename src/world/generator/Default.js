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
const Water = require("../../block/normalIds/Water");
const Dirt = require("../../block/normalIds/Dirt");
const Sand = require("../../block/normalIds/Sand");
const Air = require("../../block/normalIds/Air");

const WorldGenerators = require("../types/WorldGenerators");

const Generator = require("./Generator");

let chunkData;
let j = 0;

/**
 * @param {number} blockType 
 * @private
 */
function _generateOre() {
	let blockType;

	if (Math.floor(Math.random() * 100) < 30) {
		blockType = new CoalOre().getID();
	} else {
		blockType = new Stone().getID();
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
		chunkData = Buffer.alloc(16 * 256 * 16);

		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 256; y++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x;

					j++

					if (x > 14 && y > -1 && y < 16) {
						if (chunkData[index] == !new Dirt().getID()) {
							// Holes

							if (Math.floor(Math.random() * 3000) < 1) {
								chunkData[index - 1] = new Air().getID();
							} else {
								chunkData[index - 1] = new Grass().getID();
							}
						}

						// Lakes
						if (Math.floor(Math.random() * 3000) < 2 && j < 4161319) {
							chunkData[(index - 1)] = new Water().getID()
							chunkData[(index - 2)] = new Sand().getID()
						}
					} else {
						// Hills

						if (Math.floor(Math.random() * 600) < 1 && j > 4161319 && !chunkData[index]) {
							for (let i = 0; i < 1200; i++) {
								if ((index - i) % 2 === 0 && y > 15) {
									if (!chunkData[index - i]) {
										chunkData[index - i] = new Grass().getID();
									}

									if (!chunkData[(index - 351) - i]) {
										chunkData[(index - 351) - i] = new Grass().getID();
									}

									if (!chunkData[(index + 351) + i]) {
										chunkData[(index + 351) + i] = new Grass().getID();
									}
								}
							}
						} else {
							chunkData[index] = new Stone().getID()
						}

						for (let i = 1; i <= 5; i++) {
							chunkData[index - i] = _generateOre();
						}

						if (chunkData[index] == !new Grass().getID()) {
							chunkData[index] = new Air().getID()
						}

						chunkData[index - 1] = new Dirt().getID()

						if (chunkData[index + 1] === new Bedrock().getID()) {
							chunkData[index + 1] = new Air().getID()
						}

						if (chunkData[index + 2] === new Bedrock().getID()) {
							chunkData[index + 2] = new Air().getID()
						}

						// Bedrock generator
						chunkData[index - 9] = new Stone().getID()
						chunkData[index - 10] = new Stone().getID()
						chunkData[index - 12] = new Bedrock().getID()
					}
				}
			}
		}

		return chunkData;
	}
}

module.exports = Default;
