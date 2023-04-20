class RateLimitException extends Error {
    constructor(message) {
        super(message);
        this.name = "RateLimitException";
    }
}

module.exports = RateLimitException