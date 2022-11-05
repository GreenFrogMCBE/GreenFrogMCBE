const rl = require('readline')
const Logger = require('./Logger')
const ServerInfo = require('../api/ServerInfo');
const config = require("../../config.json");
const { Agent } = require('http');
const lang = require(`../Lang/${config.lang}.json`)

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
            if (data.startsWith(`${lang.command_time} `)) {
                const time = parseInt(data.split(" ")[1])
                if (time === NaN) {
                    Logger.prototype.log(lang.invalid_time)
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_player_online)
                    return
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    client.write('set_time', { time: time })
                }

                Logger.prototype.log(lang.time_set_day)
                return
            }

            if (data.startsWith(`${lang.command_say} `)) {

                const msg = data.split(" ")[1]
                if (msg.length < 1) {
                    Logger.prototype.log(lang.empty_message)
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_player_online)
                    return
                }

                let msg1 = lang.chat__saycommand_format.replace(`%message%`, msg)

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
            }

            if (data.startsWith(`${lang.command_kick} `)) {
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
                    reason = `${lang.no_reason}`
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_player_online)
                    return
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    if (client.getUserData().displayName == player) {
                        client.disconnect("You were kicked for: " + reason)
                    }
                }

                Logger.prototype.log(`Išmestė ${player} dėl: ${reason}`, 'info')
                return
            }
            switch (data.toLowerCase()) {
                case ``:
                    break
                case `${lang.command_shutdown}`:
                case `${land.command_stop}`:
                    Logger.prototype.log(`${lang.stopping_server}...`, 'info')
                    for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                        ServerInfo.prototype.getPlayers()[i].disconnect(lang.kick__servershutdown)
                    }
                    setTimeout(() => {
                        process.exit(0)
                    }, 1000) // give some time for the server to disconnect clients
                case `${lang.command_kick}`:
                    Logger.prototype.log(`${lang.command_usage_kick}`, 'info')
                    break;
                case `${lang.command_ver}`:
                    case `${lang.command_version}`:
                    Logger.prototype.log(`${lang.command_usage_ver}`, 'info')
                    break;
                case `${lang.command_time}`:
                    Logger.prototype.log(`${lang.command_usage_time}`, 'info')
                    break;
                case '?':
                case `${lanf.command_help}`:
                    Logger.prototype.log('Command list:');
                    Logger.prototype.log(`${lang.kick_help}`);
                    Logger.prototype.log(`${lang.shutdown_help}`);
                    Logger.prototype.log(`${lang.stop_help}`);
                    Logger.prototype.log(`${lang.help_help}`);
                    Logger.prototype.log(`${lang.qm_help}`)
                    Logger.prototype.log(`${lang.version_help}`);
                    Logger.prototype.log(`${lang.ver_help}`);
                    Logger.prototype.log(`${lang.time_help}`);
                    break;
                default:
                    Logger.prototype.log(lang.unknown_command)
                    break
            }
            r.prompt(true)
        })
    }
}

module.exports = ConsoleCommandSender;
