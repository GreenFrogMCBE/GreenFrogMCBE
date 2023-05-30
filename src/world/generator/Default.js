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
const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");

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
		chunkData = Buffer.alloc(16 * 256 * 16);

		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 256; y++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x;

					j++

					if (x > 14 && y > -1 && y < 16) {
						if (chunkData[index] == !3) {
							// Holes

							if (Math.floor(Math.random() * 3000) < 1) {
								chunkData[index - 1] = 0;
							} else {
								chunkData[index - 1] = 2;
							}
						}

						// Lakes
						if (Math.floor(Math.random() * 3000) < 2 && j < 4161319) {
							chunkData[(index - 1)] = 9
							chunkData[(index - 2)] = 12
							chunkData[(index - 270)] = 0
						}
					} else if (y < 18 && x < 11) {
						// Fix bedrock level

						if (chunkData[index] === 7) {
							chunkData[index] = 0
						}
					} else {
						// Hills

						if (Math.floor(Math.random() * 600) < 1 && j > 4161319 && y > 10) {
							for (let i = 0; i < 1200; i++) {
								if ((index - i) % 2 === 0) {
									chunkData[index - i] = 2

									chunkData[(index - 351) - i] = 2

									chunkData[(index + 351) - i] = 2
								} else {
									chunkData[index - i] = 0
								}
							}
						} else {
							chunkData[index] = 1
						}

						for (let i = 1; i <= 5; i++) {
							chunkData[index - i] = _generateOre();
						}

						if (chunkData[index] == !2) {
							chunkData[index] = 0
						}

						chunkData[index - 1] = 3

						// Bedrock generator
						chunkData[index - 9] = 7

						if (chunkData[index - 10]) {
							chunkData[index - 10] = 0
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
