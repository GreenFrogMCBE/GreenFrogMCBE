class LoggingException extends Error {
	constructor(message) {
		super(message);
		this.name = "LoggingException";
	}
}

module.exports = LoggingException;
