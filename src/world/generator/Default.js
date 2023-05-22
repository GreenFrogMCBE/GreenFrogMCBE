const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");

const WorldGenerators = require("../types/WorldGenerators");

const Generator = require("./Generator");

let chunkData;

class Default extends Generator {
	getName() {
		return WorldGenerators.FLAT;
	}

	_generateHole(index) {
		if (Math.floor(Math.random() * 300) < 1) {
			chunkData[index] = 0;
		} else {
			chunkData[index] = 2;
		}
	}

	getChunkData() {
		chunkData = Buffer.alloc(16 * 16 * 256);

		for (let y = 0; y < 256; y++) {
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					const index = y * 16 * 16 + z * 16 + x;

					if (y > 13 && x > 14) {
						this._generateHole(index)
					} else if (y > 12 && x > 14) {
						this._generateHole(index)
					} else if (y > 11 && x > 14) {
						this._generateHole(index)
					} else if (y > 10 && x > 14) {
						this._generateHole(index)
					} else if (y > 9 && x > 14) {
						this._generateHole(index)
					} else if (y > 8 && x > 14) {
						this._generateHole(index)
					} else if (y > 7 && x > 14) {
						this._generateHole(index)
					} else if (y > 6 && x > 14) {
						this._generateHole(index)
					} else if (y > 5 && x > 14) {
						this._generateHole(index)
					} else if (y > 4 && x > 14) {
						this._generateHole(index)
					} else if (y > 3 && x > 14) {
						this._generateHole(index)
					} else if (y > 2 && x > 14) {
						this._generateHole(index)
					} else if (y > 1 && x > 14) {
						this._generateHole(index)
					} else if (y > 0 && x > 14) {
						this._generateHole(index)
					} else if (y > -1 && x > 14) {
						this._generateHole(index)
					} else if (y < 18 && x < 11) {
						chunkData[index] = 0
					} else if (chunkData[index] == !2) {
						if (chunkData[index] % 2 === 0) {
							chunkData[index] = 0
							chunkData[index + 1] = 2
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
