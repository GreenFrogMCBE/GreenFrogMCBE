const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");

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
        chunkData = Buffer.alloc(16 * 16 * 256).fill(0);

        return chunkData
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

module.exports = Flat;
