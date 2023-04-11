class CommandHandlingException extends Error {
    constructor(originalError) {
        super("Failed to execute command! " + originalError);
        this.name = "CommandHandlingException";
    }
}

module.exports = CommandHandlingException