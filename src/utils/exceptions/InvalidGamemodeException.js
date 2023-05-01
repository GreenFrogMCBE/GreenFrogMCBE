class InvalidGamemodeException extends Error {
	constructor(gamemode) {
		super("Invalid gamemode provided: " + gamemode);
		this.name = "InvalidGamemodeException";
	}
}

module.exports = InvalidGamemodeException;
