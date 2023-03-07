const PlayerInfo = require("../player/PlayerInfo");
const LogTypes = require("./LogTypes");
const Logger = require("./Logger");

module.exports = {
    /**
     * Removes data of offline players
     */
    clearOfflinePlayers() {
        for (let i = 0; i < PlayerInfo.players.length; i++) {
            if (PlayerInfo.players[i].offline) {
                Logger.log("[Garbage collector] Deleted " + PlayerInfo.players[i].username, LogTypes.DEBUG)
                PlayerInfo.players.splice(i, 1);
                i--;
            }
        }
    },

    /**
     * Clears RAM from useless entries
     */
    gc() {
        Logger.log("[Garbage collector] Starting Garbage-collect everything...", LogTypes.DEBUG)
        this.clearOfflinePlayers()

        for (let i = 0; i < PlayerInfo.players.length; i++) {
            delete PlayerInfo.players[i].q;
            delete PlayerInfo.players[i].q2;
            delete PlayerInfo.players[i].profile;
            delete PlayerInfo.players[i].skinData;
            delete PlayerInfo.players[i].userData;
        }

        Logger.log("[Garbage collector] Finished", LogTypes.DEBUG)
    }
}