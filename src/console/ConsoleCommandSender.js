const rl = require('readline')
const Logger = require('./Logger')
const ServerInfo = require('../api/ServerInfo');

class ConsoleCommandSender {
    constructor() { }

    start() {

        const r = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        r.setPrompt('> ')
        r.prompt(true)

        r.on('line', (data) => {
            if (data.startsWith('kick ')) {
                const player = data.split(" ")[1]
                let reason = ""
                for (let i = 2; i < data.split(" ").length; i++) {
                    if (reason.length < 1) {
                        reason = data.split(" ")[i]
                    } else {
                        reason = reason + " " + data.split(" ")[i]
                    }
                }
                if (!reason) {
                    Logger.prototype.log('Setting reason to "No reason"', 'debug')
                    reason = "No reason"
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    if (client.getUserData().displayName == player) {
                        client.disconnect("You were kicked for: " + reason)
                    }
                }

                Logger.prototype.log(`Kicked ${player} for: ${reason}`, 'info')
                return
            }
            switch (data.toLowerCase()) {
                case '':
                    break
                case 'shutdown':
                case 'stop':
                    Logger.prototype.log('Stopping server...', 'info')
                    process.exit(0)
                case 'kick':
                    Logger.prototype.log('Usage: /kick [player] [reason]', 'info')
                    break;
                case 'ver':
                case 'version':
                    Logger.prototype.log('This server uses GreenFrogMCBE', 'info')
                    break;
                case '?':
                case 'help':
                    Logger.prototype.log('Command list:');
                    Logger.prototype.log('/kick [player] [reason] - Kicks player');
                    Logger.prototype.log('/shutdown - Shutdowns the server');
                    Logger.prototype.log('/stop - Shutdowns the server');
                    Logger.prototype.log('/help - You are looking at this command right now');
                    Logger.prototype.log('/? - Same as /help')
                    Logger.prototype.log('/version - Shows server version');
                    Logger.prototype.log('/ver - Shows server version');
                    break;
                default:
                    Logger.prototype.log('Unknown command. Type "help" for help')
                    break
            }
            r.prompt(true)
        })
    }
}

module.exports = ConsoleCommandSender;