const rl = require('readline')
const Logger = require('./Logger')
const PluginManager = require('../api/PluginManager')
const ServerInfo = require('../api/ServerInfo')
const PlayerInfo = require('../player/PlayerInfo')
const Unloader = require('../plugins/Unloader')
const Colors = require('../api/Colors')
const fs = require('fs')

class ConsoleCommandSender {
    constructor() { }

    start() {
        let closed = false
        const lang = ServerInfo.lang
        const commands = ServerInfo.commands

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
                        require(`../../plugins/${plugin}`).prototype.onConsoleCommand(data.toLowerCase())
                    } catch (e) {
                        Logger.prototype.log(lang.failedtoexecuteonConsoleCommand().replace('%command%', command), 'error')
                    }
                });
            });
            if (data.toLowerCase().startsWith(`${lang.command_time.toLowerCase()} `)) {
                if (!commands.console_command_time) { Logger.prototype.log(lang.unknown_command); return }
                let time = data.split(" ")[1]
                if (time.toLowerCase() === 'day') {
                    time = 1000;
                } else if (time.toLowerCase() === 'night') {
                    time = 17000;
                } else {
                    time = parseInt(time)
                }

                if (time === NaN) {
                    Logger.prototype.log(lang.invalid_time)
                    return
                }

                if (PlayerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_players_online)
                    return
                }

                for (let i = 0; i < PlayerInfo.prototype.getPlayers().length; i++) {
                    let client = PlayerInfo.prototype.getPlayers()[i]
                    client.write('set_time', { time: time })
                }

                Logger.prototype.log(lang.time_updated)
                return
            }

            if (data.toLowerCase().startsWith(`${lang.command_say.toLowerCase()} `)) {
                if (!commands.console_command_say) { Logger.prototype.log(lang.unknown_command); return }

                const msg = data.split(" ")[1]
                if (msg.length < 1) {
                    Logger.prototype.log(lang.empty_message)
                    return
                }

                if (PlayerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_players_online)
                    return
                }

                let msg1 = lang.saycommand_format.replace(`%message%`, msg)

                for (let i = 1; i < PlayerInfo.prototype.getPlayers().length; i++) {
                    let client = PlayerInfo.prototype.getPlayers()[i]

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

            if (data.toLowerCase().startsWith(`${lang.command_kick.toLowerCase()} `)) {
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

                if (PlayerInfo.prototype.getPlayers() === undefined) {
                    Logger.prototype.log(lang.no_players_online)
                    return
                }

                for (let i = 0; i < PlayerInfo.prototype.getPlayers().length; i++) {
                    let client = PlayerInfo.prototype.getPlayers()[i]
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
                case "":
                    break
                case lang.command_shutdown.toLowerCase():
                case lang.command_stop.toLowerCase():
                    if (!commands.console_command_stop) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.stopping_server, 'info')
                    try {
                        for (let i = 0; i < PlayerInfo.prototype.getPlayers().length; i++) {
                            PlayerInfo.prototype.getPlayers()[i].disconnect(lang.kick__servershutdown)
                        }
                    } catch (e) { }
                    closed = true
                    Unloader.prototype.shutdown();
                    break
                case lang.command_kick.toLowerCase():
                    if (!commands.console_command_kick) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.command_usage_kick, 'info')
                    break;
                case lang.command_pl.toLowerCase():
                case lang.command_plugins.toLowerCase():
                    if (!commands.console_command_plugins) { Logger.prototype.log(lang.unknown_command); return; }
                    let plugins;
                    if (PluginManager.prototype.getPlugins() == null) {
                        plugins = 0;
                    } else {
                        plugins = PluginManager.prototype.getPlugins().length
                    }
                    Logger.prototype.log(`${lang.plugins} (${plugins}): ${Colors.CONSOLE_PL_GREEN}${PluginManager.prototype.getPlugins() ?? ''} ${Colors.CONSOLE_RESET}`, 'info')
                    break
                case lang.command_ver.toLowerCase():
                case lang.command_version.toLowerCase():
                    if (!commands.console_command_version) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.command_ver_info.replace('%version%', ServerInfo.serverversion), 'info')
                    break;
                case lang.command_time.toLowerCase():
                    if (!commands.console_command_time) { Logger.prototype.log(lang.unknown_command); return; }
                    Logger.prototype.log(lang.command_usage_time, 'info')
                    break;
                case '?':
                case lang.command_help.toLowerCase():
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
                    if (commands.console_command_pl) { Logger.prototype.log(lang.pl_help); }
                    if (commands.console_command_plugins) { Logger.prototype.log(lang.plugins_help); }
                    break;
                default:
                    Logger.prototype.log(lang.unknown_command)
                    break
            }
            if (!closed) r.prompt(true)
        })
    }
}

module.exports = ConsoleCommandSender;
