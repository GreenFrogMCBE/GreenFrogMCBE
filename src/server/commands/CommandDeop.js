const fs = require("fs");
const Logger = require("../Logger");
const { lang, config } = require("../../server/ServerInfo");

class CommandDeop extends require("./Command") {
    name() {
        return lang.commands.deop;
    }

    aliases() {
        return null;
    }

    execute(args) {
        if (!config.consoleCommandDeop) {
            Logger.log(lang.errors.unknownCommand);
            return;
        }

        if (!args) {
            Logger.log(lang.commands.usageDeop);
            return;
        }

        fs.readFile("ops.yml", "utf-8", (err, data) => {
            if (err) {
                Logger.log(lang.commands.deopFail);
                return;
            }

            const players = data.trim().split("\n");
            const index = players.indexOf(args);

            if (index === -1) {
                Logger.log(lang.commands.notOp.replace("%player%", args));
                return;
            }

            players.splice(index, 1);
            const updatedPlayers = players.join("\n") + "\n";

            fs.writeFile("ops.yml", updatedPlayers, (err) => {
                if (!err) Logger.log(lang.commands.deopped.replace("%player%", args));
                else Logger.log(lang.commands.deopFail);
            });
        });
    }
}   

module.exports = CommandDeop