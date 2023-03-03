class ChunkError extends Error {
    constructor(message) {
        super("Failed to load chunks! " + message);
        this.name = "ChunkError";
    }
}

module.exports = ChunkError;
