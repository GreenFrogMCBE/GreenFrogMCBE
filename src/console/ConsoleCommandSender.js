const rl = require('readline')
const Logger = require('./Logger')
const ServerInfo = require('../api/ServerInfo');
const fs = require('fs')

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
            fs.readdir("./plugins", (err, plugins) => {
                plugins.forEach(plugin => {
                    try {
                        require(`../../plugins/${plugin}`).prototype.onConsoleCommand(data)
                    } catch (e) {
                        Logger.prototype.log(lang.failedtoexecuteonConsoleCommand().replace('%command%', command), 'error')
                    }
                });
            });
            if (data.startsWith(`${ServerInfo.prototype.getLang().command_time} `)) {
                if (!ServerInfo.prototype.getConfig().console_time) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return }
                const time = parseInt(data.split(" ")[1])
                if (time === NaN) {
                    Logger.prototype.log(ServerInfo.prototype.getLang().invalid_time)
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(ServerInfo.prototype.getLang().no_players_online)
                    return
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    client.write('set_time', { time: time })
                }

                Logger.prototype.log(ServerInfo.prototype.getLang().time_updated)
                return

            }

            if (data.startsWith(`${ServerInfo.prototype.getLang().command_say} `)) {
                if (!ServerInfo.prototype.getConfig().console_say) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return }

                const msg = data.split(" ")[1]
                if (msg.length < 1) {
                    Logger.prototype.log(ServerInfo.prototype.getLang().empty_message)
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(ServerInfo.prototype.getLang().no_players_online)
                    return
                }

                let msg1 = ServerInfo.prototype.getLang().chat__saycommand_format.replace(`%message%`, msg)

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

            if (data.startsWith(`${ServerInfo.prototype.getLang().command_kick} `)) {
                if (!ServerInfo.prototype.getConfig().console_kick) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return }

                const player = data.split(" ")[1]
                let reason = ""
                let playeroffline = true
                for (let i = 2; i < data.split(" ").length; i++) {
                    if (reason.length < 1) {
                        reason = data.split(" ")[i]
                    } else {
                        reason = reason + " " + data.split(" ")[i]
                    }
                }

                if (!reason) {
                    reason = `${ServerInfo.prototype.getLang().no_reason}`
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(ServerInfo.prototype.getLang().no_players_online)
                    return
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    if (client.getUserData().displayName == player) {
                        client.disconnect(ServerInfo.prototype.getLang().kicked_prefix + reason)
                        Logger.prototype.log(ServerInfo.prototype.getLang().kicked_consolemsg.replace('%player%', player).replace('%reason%', reason), 'info')
                        playeroffline = false
                    }
                }

                if (playeroffline) {
                    Logger.prototype.log(ServerInfo.prototype.getLang().playeroffline, 'info')
                }

                return
            }
            switch (data.toLowerCase()) {
                case ServerInfo.prototype.getLang().empty:
                    break
                case ServerInfo.prototype.getLang().command_shutdown:
                case ServerInfo.prototype.getLang().command_stop:
                    if (!ServerInfo.prototype.getConfig().console_stop) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return; }
                    Logger.prototype.log(ServerInfo.prototype.getLang().stopping_server, 'info')
                    try {
                        for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                            ServerInfo.prototype.getPlayers()[i].disconnect(ServerInfo.prototype.getLang().kick__servershutdown)
                        }
                    } catch (e) { }
                    setTimeout(() => {
                        process.exit(0)
                    }, 1000) // give some time for the server to disconnect clients
                    break
                case ServerInfo.prototype.getLang().command_kick:
                    if (!ServerInfo.prototype.getConfig().console_kick) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return; }
                    Logger.prototype.log(ServerInfo.prototype.getLang().command_usage_kick, 'info')
                    break;
                case ServerInfo.prototype.getLang().command_ver:
                case ServerInfo.prototype.getLang().command_version:
                    if (!ServerInfo.prototype.getConfig().console_version) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return; }
                    Logger.prototype.log(ServerInfo.prototype.getLang().command_ver_info, 'info')
                    break;
                case ServerInfo.prototype.getLang().command_time:
                    if (!ServerInfo.prototype.getConfig().console_time) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return; }
                    Logger.prototype.log(ServerInfo.prototype.getLang().command_usage_time, 'info')
                    break;
                case '?':
                case ServerInfo.prototype.getLang().command_help:
                    if (!ServerInfo.prototype.getConfig().console_command_help) { Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command); return; }
                    Logger.prototype.log(ServerInfo.prototype.getLang().commandlist);
                    if (ServerInfo.prototype.getConfig().console_command_kick) { Logger.prototype.log(ServerInfo.prototype.getLang().kick_help); }
                    if (ServerInfo.prototype.getConfig().console_command_stop) { Logger.prototype.log(ServerInfo.prototype.getLang().shutdown_help); }
                    if (ServerInfo.prototype.getConfig().console_command_stop) { Logger.prototype.log(ServerInfo.prototype.getLang().stop_help); }
                    if (ServerInfo.prototype.getConfig().console_command_help) { Logger.prototype.log(ServerInfo.prototype.getLang().help_help); }
                    if (ServerInfo.prototype.getConfig().console_command_help) { Logger.prototype.log(ServerInfo.prototype.getLang().qm_help) }
                    if (ServerInfo.prototype.getConfig().console_command_version) { Logger.prototype.log(ServerInfo.prototype.getLang().version_help); }
                    if (ServerInfo.prototype.getConfig().console_command_version) { Logger.prototype.log(ServerInfo.prototype.getLang().ver_help); }
                    if (ServerInfo.prototype.getConfig().console_command_time) { Logger.prototype.log(ServerInfo.prototype.getLang().time_help); }
                    break;
                default:
                    Logger.prototype.log(ServerInfo.prototype.getLang().unknown_command)
                    break
            }
            r.prompt(true)
        })
    }
}

module.exports = ConsoleCommandSender;
