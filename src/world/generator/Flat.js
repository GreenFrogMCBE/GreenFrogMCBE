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
const Air = require("../../block/normalIds/Air");
const Dirt = require("../../block/normalIds/Dirt");
const Grass = require("../../block/normalIds/Grass");
const Bedrock = require("../../block/normalIds/Bedrock");

const WorldGenerator = require("../types/WorldGenerator");

const Generator = require("./Generator");

let chunkData;

class Flat extends Generator {
	/**
	 * @returns {WorldGenerator.Flat}
	 */
	getName() {
		return WorldGenerator.FLAT;
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
						chunkData[index] = new Grass().getId();
					} else if (y < 18 && x < 11) {
						chunkData[index] = new Air().getId();
					} else if (y < 17 && x < 12) {
						chunkData[index] = new Bedrock().getId();
					} else {
						chunkData[index] = new Dirt().getId();
					}
				}
			}
		}

		return chunkData;
	}
}

module.exports = Flat;
