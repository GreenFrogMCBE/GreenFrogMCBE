const Grass = require("../../block/chunk/Grass");
const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");
const WorldGenerators = require("../types/WorldGenerators");
const Generator = require("./Generator");

class Flat extends Generator {
    getName() {
        return WorldGenerators.FLAT;
    }

    generate(player) {
        const chunkData = Buffer.alloc(16 * 256).fill(new Grass().getID());

        const chunkRadius = player.world.getChunkRadius();

        for (let x = player.location.x - chunkRadius; x <= player.location.x + chunkRadius; x++) {
            for (let z = player.location.z - chunkRadius; z <= player.location.z + chunkRadius; z++) {
                const levelChunk = new ServerLevelChunkPacket()
                levelChunk.setX(x)
                levelChunk.setZ(z)
                levelChunk.setSubChunkCount(1)
                levelChunk.setCacheEnabled(false)
                levelChunk.setPayload(chunkData)
                levelChunk.writePacket(player)
            }
        }
    }
}

module.exports = Flat;
