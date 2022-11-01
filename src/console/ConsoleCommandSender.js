const rl = require('readline')
const Logger = require('./Logger')
const ServerInfo = require('../api/ServerInfo');

class ConsoleCommandSender {
    constructor() {}

    start() {

        const r = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        r.setPrompt('> ')
        r.prompt(true)

        r.on('line', (data) => {
            if (data.startsWith('time ')) {
                const time = parseInt(data.split(" ")[1])
                if (time === NaN) {
                    Logger.prototype.log('Invalid time')
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(`There are no players online`)
                    return
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    client.write('set_time', { time: time })
                }

                Logger.prototype.log(`Time set to day`)
                return
            }

            /* if (data.startsWith('say ')) {

                const msg = data.split(" ")[1]
                if (msg.length < 1) {
                    Logger.prototype.log('Your message is empty')
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(`There are no players online`)
                    return
                }

                let msg1 = require('../../lang.json').chat__saycommand_format.replace(`%message%`, msg)

                for (let i = 1; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                   
                    client.write('text', {
                        type: 'announcement',
                        needs_translation: false,
                        source_name: '',
                        message: msg1,
                        xuid: '',
                        platform_chat_id: ''
                    })

                }

                Logger.prototype.log(msg1)
                return
            } */

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
                    reason = "No reason"
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(`There are no players online`)
                    return
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
                    for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                        ServerInfo.prototype.getPlayers()[i].disconnect(require('../../lang.json').kick__servershutdown)
                    }
                    setTimeout(() => {
                        process.exit(0)
                    }, 1000) // give some time for the server to disconnect clients
                case 'kick':
                    Logger.prototype.log('Usage: /kick [player] [reason]', 'info')
                    break;
                case 'ver':
                case 'version':
                    Logger.prototype.log('This server uses GreenFrogMCBE', 'info')
                    break;
                case 'time':
                    Logger.prototype.log('Usage: /time [time]', 'info')
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
                    Logger.prototype.log('/time - Set time for all players');
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