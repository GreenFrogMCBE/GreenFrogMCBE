class InvalidGamemodeException extends Error {
    constructor(message = "Invalid gamemode provided.") {
        super(message);
        this.name = "InvalidGamemodeException";
    }
}

module.exports = InvalidGamemodeException