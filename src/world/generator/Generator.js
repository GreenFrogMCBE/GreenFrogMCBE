const Frog = require("../../Frog");

const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");

class Generator {
    /**
     * @type {import("Frog").WorldGenerator | undefined}
     */
    name;

    /**
     * @returns {Buffer | null}
     */
    getChunkData() {
        return null;
    }

    /**
     * @param {import("Frog").Player} player
     */
    generate(player) {
        Frog.eventEmitter.emit("generatorGeneratingWorld", { player });

        const chunkRadius = player.world.renderDistance;

        for (let x = player.location.x - chunkRadius; x <= player.location.x + chunkRadius; x++) {
            for (let z = player.location.z - chunkRadius; z <= player.location.z + chunkRadius; z++) {
                const levelChunk = new ServerLevelChunkPacket();
                levelChunk.x = x;
                levelChunk.z = z;
                levelChunk.sub_chunk_count = 1;
                levelChunk.cache_enabled = false;
                levelChunk.payload = this.getChunkData();
                levelChunk.writePacket(player);
            }
        }
    }
}

module.exports = Generator;
