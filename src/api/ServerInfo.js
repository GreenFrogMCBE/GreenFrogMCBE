const config = require("../../config.json")

class ServerInfo {
    constructor() {
        this.players = []
        this.commands = require(`../../../commands.json`)
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
        return require(`../../lang/${config.lang}.json`);
    }

    getServerVersion() {
        return "1.1";
    }

    getCommandsFile() {
        return this.commands;
    }

}

module.exports = ServerInfo;
