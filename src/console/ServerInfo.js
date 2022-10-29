class ServerInfo {
    constructor() {
        this.players = []
        this.config = require("../../config.json")
        // this class file will be used soon
    }

    setPlayers (players) {
        this.players = players
    }

    getPlayers () {
        return this.players;
    }

    getConfig () {
        return this.config;
    }

}

module.exports = ServerInfo;
