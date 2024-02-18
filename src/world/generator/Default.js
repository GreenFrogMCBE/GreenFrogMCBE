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
const { WorldGenerationType, Dirt, Grass, Air, Bedrock, CoalOre } = require("@greenfrog/mc-enums")

const Generator = require("./Generator")
const Flat = require("./Flat")

class Default extends Generator {
	name = WorldGenerationType.Default

	/** @type {Buffer} */
	chunk_data = Buffer.alloc(16 * 256 * 16)

	/** @type {number} */
	blockCount = 0

	get_chunk_data() {
		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 256; y++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x

					if (index < 3000) {
						for (let i = 0; i < 1200; i++) {
							if ((index - i) % 2 === 0 ) {
								if (!this.chunk_data[index - i]) {
									this.chunk_data[index - i] = new Grass().id
								}

								if (!this.chunk_data[index - 351 - i]) {
									this.chunk_data[index - 351 - i] = new Grass().id
								}
							}
						}
					}

					this.chunk_data[index] = new Grass().id
				}
			}
		}

		return this.chunk_data
	}
}

module.exports = Default
