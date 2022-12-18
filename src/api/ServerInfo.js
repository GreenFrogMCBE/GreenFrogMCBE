const config = require("../../config.json")

class ServerInfo {
    constructor() {
        this.players = []
    }

    setPlayers (players) {
        this.players = players
    }

    getPlayers () {
        return this.players;
    }

    getConfig () {
        return require("../../config.json");
    }

    getLang () {
        return require(`../lang/${config.lang}.json`);
    }

    getServerVersion() {
        return "1.1";
    }

    getCommands() {
        return require(`../../../commands.json`)
    }

}

module.exports = ServerInfo;
