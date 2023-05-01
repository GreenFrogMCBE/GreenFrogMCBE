class BlockBreakException extends Error {
	constructor(message) {
		super("BlockBreakException: " + message);
		this.name = "BlockBreakException";
	}
}

module.exports = BlockBreakException;
