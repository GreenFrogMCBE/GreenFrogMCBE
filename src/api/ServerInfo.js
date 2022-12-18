const config = require("../../config.json")

class ServerInfo {
    constructor() {
        this.players = []
        this.config = require("../../config.json")
        this.lang = require(`../../lang/${config.lang}.json`)
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
        return this.lang;
    }

    getServerVersion() {
        return "1.1";
    }

    getCommandsFile() {
        return this.commands;
    }

}

module.exports = ServerInfo;
