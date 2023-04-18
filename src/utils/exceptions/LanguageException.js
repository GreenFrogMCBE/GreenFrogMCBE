class LanguageException extends Error {
    constructor(message) {
        super("LanguageException: " + message)
        this.name = 'LanguageException'
    }
}

module.exports = LanguageException