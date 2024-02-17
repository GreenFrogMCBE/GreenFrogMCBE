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
const { WorldGenerationType, Dirt, Grass, Air, Bedrock, CoalOre} = require("@greenfrog/mc-enums")

const Generator = require("./Generator")

const dirt = new Dirt().id
const grass = new Grass().id
const air = new Air().id
const bedrock = new Bedrock().id
const stone = new Bedrock().id
const coal_ore = new CoalOre().id

/**
 * @private
 */
function _generateOre() {
	let blockType

	if (Math.floor(Math.random() * 100) < 30) {
		blockType = coal_ore
	} else {
		blockType = stone
	}

	return blockType
}

class Default extends Generator {
	name = WorldGenerationType.Default

	/** @type {Buffer} */
	chunk_data = Buffer.alloc(16 * 256 * 16)
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
						this.chunk_data[index - 1] = randomNumbers[index - 1] < airThreshold ? air : grass
					} else {
						// Hills
						if (randomNumbers[index] < hillThreshold && this.blockCount > 4161319 && !this.chunk_data[index]) {
							for (let i = 0; i < 1200; i++) {
								if ((index - i) % 2 === 0 && y > 15) {
									if (!this.chunk_data[index - i]) {
										this.chunk_data[index - i] = grass
									}

									if (!this.chunk_data[index - magicOffset - i]) {
										this.chunk_data[index - magicOffset - i] = grass
									}
								}
							}
						} else {
							this.chunk_data[index] = stone
						}

						// Generate ores
						for (let i = 1; i <= 5; i++) {
							this.chunk_data[index - i] = _generateOre()
						}

						// Dirt generator
						this.chunk_data[index - 1] = dirt

						// Bedrock generator
						if (this.chunk_data[index + 1] === bedrock || this.chunk_data[index + 2] === bedrock) {
							this.chunk_data[index + 1] = air
							this.chunk_data[index + 2] = air
						}

						this.chunk_data[index - 13] = bedrock
					}
				}
			}
		}

		return this.chunk_data
	}
}

module.exports = Default
