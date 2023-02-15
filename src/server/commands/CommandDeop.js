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
                if (!err) {
                    Logger.log(lang.commands.deopped.replace("%player%", args));
                }
                else Logger.log(lang.commands.deopFail);
            });
        });
    }

    getPlayerDescription() {
        return lang.commands.ingameDeopDescription;
    }

    executePlayer(client, args) {
        if (!config.playerCommandDeop) {
            client.sendMessage('§c' + lang.errors.playerUnknownCommand);
            return;
        }

        if (!args.split(" ")[1]) {
            client.sendMessage('§c' + lang.commands.usageDeop);
            return;
        }

        if (!client.op) {
            client.sendMessage(lang.errors.noPermission)
            return
        }

        fs.readFile("ops.yml", "utf-8", (err, data) => {
            if (err) {
                client.sendMessage('§c' + lang.commands.deopFail);
                return;
            }

            const players = data.trim().split("\n");
            const index = players.indexOf(args.split(" ")[1]);

            if (index === -1) {
                client.sendMessage('§c' + lang.commands.notOp.replace("%player%", args.split(" ")[1]));
                return;
            }

            players.splice(index, 1);
            const updatedPlayers = players.join("\n") + "\n";

            fs.writeFile("ops.yml", updatedPlayers, (err) => {
                if (!err) {
                    client.sendMessage(lang.commands.deopped.replace("%player%", args.split(" ")[1]));
                }
                else client.sendMessage('§c' + lang.commands.deopFail);
            });
        });
    }
}

module.exports = CommandDeop