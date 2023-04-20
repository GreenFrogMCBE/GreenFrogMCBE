class InvalidPositionException extends Error {
    constructor(message) {
        super("Invalid position/packet: " + message);
        this.name = "InvalidPositionException";
    }
}

module.exports = InvalidPositionException