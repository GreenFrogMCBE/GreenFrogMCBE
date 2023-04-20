class ConsoleSetupException extends Error {
    constructor(reason) {
        super("Failed to setup console! " + reason);
        this.name = "ConsoleSetupException";
    }
}

module.exports = ConsoleSetupException