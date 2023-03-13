class UnsupportedOperationException extends Error {
    constructor(message) {
        super("UnsupportedOperationException: " + message);
        this.name = "UnsupportedOperationException"
    }
}

module.exports = UnsupportedOperationException;