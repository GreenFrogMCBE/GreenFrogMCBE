const WorldGenerators = require("../types/WorldGenerators");

const Generator = require("./Generator");

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
        return Buffer.alloc(16 * 256 * 16).fill(0)
    }
}

module.exports = Flat;
