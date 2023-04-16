class ChunkLoadException extends Error {
    constructor(message) {
        super("Failed to load chunk: " + message)
        this.name = 'ChunkLoadException'
    }
}

module.exports = ChunkLoadException