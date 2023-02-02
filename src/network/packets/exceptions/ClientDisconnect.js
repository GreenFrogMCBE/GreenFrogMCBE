class ClientDisconnect extends Error {
    constructor(message) {
        super(message);
        this.name = "ClientDisconnect";
    }
}

module.exports = ClientDisconnect;