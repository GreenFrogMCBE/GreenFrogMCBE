class UnsupportedOperationException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnsupportedOperationException';
        this.message = message || 'This operation is not supported';
        this.stack = (new Error()).stack;
    }
}

module.exports = UnsupportedOperationException;