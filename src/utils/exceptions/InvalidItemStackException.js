class InvalidItemStackException extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidItemStackException";
	}
}

module.exports = InvalidItemStackException;
