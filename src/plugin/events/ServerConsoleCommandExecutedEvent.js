/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
const Shutdown = require("../../server/commands/CommandShutdown");
const Version = require("../../server/commands/CommandVersion");
const Kick = require("../../server/commands/CommandKick");
const Help = require("../../server/commands/CommandHelp");
const Time = require("../../server/commands/CommandTime");
const Say = require("../../server/commands/CommandSay");
const Op = require("../../server/commands/CommandOp");
const PL = require("../../server/commands/CommandPl");
const FailedToHandleEvent = require('./exceptions/FailedToHandleEvent')
const { lang, config } = require('../../server/ServerInfo')
const Logger = require('../../server/Logger')
const Event = require('./Event')

const fs = require('fs')

class ServerConsoleCommandExecutedEvent extends Event {
    constructor() {
        super()
        this.cancelled = false
        this.name = 'ServerConsoleCommandExecutedEvent'
    }

    cancel() {
        this.cancelled = true
    }

    execute(server, command) {
        fs.readdir("./plugins", (err, plugins) => {
            plugins.forEach((plugin) => {
                try {
                    require(`${__dirname}\\..\\..\\..\\plugins\\${plugin}`).ServerConsoleCommandExecutedEvent(server, command, this);
                } catch (e) {
                    FailedToHandleEvent.handleEventError(e, plugin, this.name)
                }
            });
        });
        this.postExecute(command)
    }

    isCancelled() {
        return this.cancelled
    }

    postExecute(cmd) {
        if (!this.isCancelled() || !config.disable) {
            const commands = {
                shutdown: new Shutdown(),
                kick: new Kick(),
                version: new Version(),
                help: new Help(),
                time: new Time(),
                say: new Say(),
                op: new Op(),
                pl: new PL(),
            };

            if (config.debug) Logger.log("started", command);
            if (
                cmd.toLowerCase().startsWith(`${lang.commands.time.toLowerCase()} `)
            ) {
                commands.time.execute(cmd.split(" "));
                return;
            }

            if (
                cmd.toLowerCase().startsWith(`${lang.commands.say.toLowerCase()} `)
            ) {
                const msg = cmd.split(" ").slice(1).join(" ");
                commands.say.execute(msg);
                return;
            }

            if (
                cmd.toLowerCase().startsWith(`${lang.commands.kick.toLowerCase()} `)
            ) {
                const dataParts = cmd.split(" ");
                const target = dataParts[1];
                const reason = dataParts.slice(2).join(" ");
                commands.kick.execute([target, reason]);
                return;
            }

            if (cmd.toLowerCase().startsWith(`${lang.commands.op.toLowerCase()} `)) {
                commands.op.execute(cmd.split(" ")[1]);
                return;
            }

            const command = cmd.toLowerCase().split(" ")[0];

            switch (command) {
                case "":
                    break;
                case lang.commands.shutdown.toLowerCase():
                case lang.commands.stop.toLowerCase():
                    commands.shutdown.execute();
                    break;
                case lang.commands.op.toLowerCase():
                    commands.op.execute(command.split(" ")[1]);
                    break;
                case lang.commands.kick.toLowerCase():
                    const reason = command.split(" ").slice(2).join(" ");
                    commands.kick.execute(command.split(" ")[1], reason);
                    break;
                case lang.commands.pl.toLowerCase():
                case lang.commands.plugins.toLowerCase():
                    commands.pl.execute();
                    break;
                case lang.commands.ver.toLowerCase():
                case lang.commands.version.toLowerCase():
                    commands.version.execute();
                    break;
                case lang.commands.time.toLowerCase():
                    commands.time.execute();
                    break;
                case lang.commands.say.toLowerCase():
                    const msg = command.split(" ").slice(1).join(" ");
                    commands.say.execute(msg);
                    break;
                case "?":
                case lang.commands.help.toLowerCase():
                    commands.help.execute();
                    break;
                default:
                    Logger.log(lang.commands.unknownCommand);
                    break;
            }
        }
    }
}

module.exports = ServerConsoleCommandExecutedEvent