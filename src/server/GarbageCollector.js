const PlayerInfo = require("../player/PlayerInfo");
const Logger = require("./Logger");
const LogTypes = require("./LogTypes");

module.exports = {
    clearOfflinePlayers() {
        for (let i = 0; i < PlayerInfo.players.length; i++) {
            if (PlayerInfo.players[i].offline) {
                Logger.log(LogTypes.DEBUG, " | Garbage collector | Deleted " + PlayerInfo.players[i].username)
                PlayerInfo.players.splice(i, 1);
                i--;
            }
        }
    }
}