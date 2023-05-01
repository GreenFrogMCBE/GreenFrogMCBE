class ChunkLoadException extends Error {
	constructor(message) {
		super(message);
		this.name = "ChunkLoadException";
	}
}

module.exports = ChunkLoadException;
