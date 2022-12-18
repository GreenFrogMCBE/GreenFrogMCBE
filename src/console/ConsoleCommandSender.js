const rl = require('readline')
const Logger = require('./Logger')
const ServerInfo = require('../api/ServerInfo')
const PluginManager = require('../api/PluginManager')
const Colors = require('../api/Colors')
const lang = ServerInfo.prototype.getLang()
const commands = ServerInfo.prototype.getCommands()
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
            if (data.startsWith(`${lang.command_time} `)) {
                if (!commands.console_command_time) { Logger.prototype.log(lang.unknown_command); return }
                const time = parseInt(data.split(" ")[1])
                if (time === NaN) {
                    Logger.prototype.log(lang.invalid_time)
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_players_online)
                    return
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    client.write('set_time', { time: time })
                }

                Logger.prototype.log(lang.time_updated)
                return
            }

            if (data.startsWith(`${lang.command_say} `)) {
                if (!commands.console_command_say) { Logger.prototype.log(lang.unknown_command); return }

                const msg = data.split(" ")[1]
                if (msg.length < 1) {
                    Logger.prototype.log(lang.empty_message)
                    return
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_players_online)
                    return
                }

                let msg1 = lang.saycommand_format.replace(`%message%`, msg)

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

            if (data.startsWith(`${lang.console_command_kick} `)) {
                if (!commands.console_command_kick) { Logger.prototype.log(lang.unknown_command); return }

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
                    reason = `${lang.no_reason}`
                }

                if (ServerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_players_online)
                    return
                }

                for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                    let client = ServerInfo.prototype.getPlayers()[i]
                    if (client.getUserData().displayName == player) {
                        client.disconnect(lang.kicked_prefix + reason)
                        Logger.prototype.log(lang.kicked_consolemsg.replace('%player%', player).replace('%reason%', reason), 'info')
                        playeroffline = false
                    }
                }

                if (playeroffline) {
                    Logger.prototype.log(lang.playeroffline, 'info')
                }

                return
            }
            switch (data.toLowerCase()) {
                case lang.empty:
                    break
                case lang.command_shutdown:
                case lang.command_stop:
                    if (!console_command_stop) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.stopping_server, 'info')
                    try {
                        for (let i = 0; i < ServerInfo.prototype.getPlayers().length; i++) {
                            ServerInfo.prototype.getPlayers()[i].disconnect(lang.kick__servershutdown)
                        }
                    } catch (e) { }
                    setTimeout(() => {
                        process.exit(0)
                    }, 1000) // give some time for the server to disconnect clients
                    break
                case lang.command_kick:
                    if (!commands.console_command_kick) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.command_usage_kick, 'info')
                    break;
                case 'plugins':
                case 'pl':
                    Logger.prototype.log(`Plugins (${PluginManager.prototype.getPlugins().length}): ${Colors.CONSOLE_PL_GREEN}${PluginManager.prototype.getPlugins()}`, 'info')
                    break
                case lang.command_ver:
                case lang.command_version:
                    if (!commands.console_command_version) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.command_ver_info.replace('%version%', ServerInfo.prototype.getServerVersion()), 'info')
                    break;
                case lang.command_time:
                    if (!commands.console_command_time) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.command_usage_time, 'info')
                    break;
                case '?':
                case lang.command_help:
                    if (!commands.console_command_help) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.commandlist);
                    if (commands.console_command_kick) { Logger.prototype.log(lang.kick_help); }
                    if (commands.console_command_time) { Logger.prototype.log(lang.time_help); }
                    if (commands.console_command_stop) { Logger.prototype.log(lang.shutdown_help); }
                    if (commands.console_command_stop) { Logger.prototype.log(lang.stop_help); }
                    if (commands.console_command_help) { Logger.prototype.log(lang.help_help); }
                    if (commands.console_command_help) { Logger.prototype.log(lang.qm_help) }
                    if (commands.console_command_version) { Logger.prototype.log(lang.version_help); }
                    if (commands.console_command_version) { Logger.prototype.log(lang.ver_help); }
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
