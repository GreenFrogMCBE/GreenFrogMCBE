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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const vanillaBlocks = require("../../block/vanillaBlocks.json")

const WorldGenerator = require("../types/WorldGenerator")

const Generator = require("./Generator")

const dirt = vanillaBlocks.dirt.legacy_id
const grass = vanillaBlocks.grass.legacy_id
const air = vanillaBlocks.air.legacy_id
const bedrock = vanillaBlocks.bedrock.legacy_id
const stone = vanillaBlocks.stone.legacy_id
const coalOre = vanillaBlocks.coal_ore.legacy_id

/**
 * @private
 */
function _generateOre() {
	let blockType

	if (Math.floor(Math.random() * 100) < 30) {
		blockType = coalOre
	} else {
		blockType = stone
	}

	return blockType
}

class Default extends Generator {
	name = WorldGenerator.DEFAULT

	/** @type {Buffer} */
	chunkData = Buffer.alloc(16 * 256 * 16)
	/** @type {number} */
	blockCount = 0

	get_chunk_data() {
		const airThreshold = 1 / 3000
		const hillThreshold = 5 / 600

		const magicOffset = 351

		const randomNumbers = new Array(16 * 256 * 16).fill(0).map(() => Math.random())

		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 256; y++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x
					this.blockCount++

					if (x > 14 && y > -1 && y < 16) {
						// Holes
						this.chunkData[index - 1] = randomNumbers[index - 1] < airThreshold ? air : grass
					} else {
						// Hills
						if (randomNumbers[index] < hillThreshold && this.blockCount > 4161319 && !this.chunkData[index]) {
							for (let i = 0; i < 1200; i++) {
								if ((index - i) % 2 === 0 && y > 15) {
									if (!this.chunkData[index - i]) {
										this.chunkData[index - i] = grass
									}

									if (!this.chunkData[index - magicOffset - i]) {
										this.chunkData[index - magicOffset - i] = grass
									}
								}
							}
						} else {
							this.chunkData[index] = stone
						}

						// Generate ores
						for (let i = 1; i <= 5; i++) {
							this.chunkData[index - i] = _generateOre()
						}

						// Dirt generator
						this.chunkData[index - 1] = dirt

						// Bedrock generator
						if (this.chunkData[index + 1] === bedrock || this.chunkData[index + 2] === bedrock) {
							this.chunkData[index + 1] = air
							this.chunkData[index + 2] = air
						}

						this.chunkData[index - 13] = bedrock
					}
				}
			}
		}

		return this.chunkData
	}
}

module.exports = Default
