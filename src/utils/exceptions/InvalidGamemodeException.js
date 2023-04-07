class InvalidGamemodeException extends Error {
    constructor() {
        super("Invalid gamemode provided.");
        this.name = "InvalidGamemodeException";
    }
}

module.exports = InvalidGamemodeException