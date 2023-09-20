class ServerStartupException extends Error {
	/**
	 * @constructor
	 * @param {string} message
	 */
	constructor(message) {
		super(message);

		this.name = "ServerStartupException";
	}
}

module.exports = ServerStartupException;
