const Bedrock = require('bedrock-protocol')
const Logger = require('./console/Logger')
const ConsoleCommandSender = require('./console/ConsoleCommandSender')
const ServerInfo = require('./api/ServerInfo')
const PlayerInfo = require('./player/PlayerInfo')
const ValidateConfig = require('./server/ValidateConfig')
const Loader = require('./plugins/Loader')
const fs = require('fs')
let clients = []

ValidateConfig.prototype.ValidateConfig()
ValidateConfig.prototype.ValidateLangFile()
ValidateConfig.prototype.ValidateCommands()

const config = ServerInfo.config
const lang = ServerInfo.lang
const commands = ServerInfo.commands

Logger.prototype.log(lang.loadingserver)

process.on('uncaughtException', function (err) {
    Logger.prototype.log(`${lang.servererror}: ${err.stack}`, 'error')
    if (!config.donotcrashoncriticalerrors) {
        process.exit(-1)
    }
})

process.on('uncaughtExceptionMonitor', function (err) {
    Logger.prototype.log(`${lang.servererror}: ${err.stack}`, 'error')
    if (!config.donotcrashoncriticalerrors) {
        process.exit(-1)
    }
})

process.on('unhandledRejection', function (err) {
    Logger.prototype.log(`${lang.servererror}: ${err.stack}`, 'error')
    if (!config.donotcrashoncriticalerrors) {
        process.exit(-1)
    }
})

const get = (packetName) => require(`./network/packets/${packetName}.json`)

if (config.donotcrashoncriticalerrors) {
    Logger.prototype.log(lang.unstablewarning, 'warning')
}

if (config.debug) {
    Logger.prototype.log(lang.debugwarning, 'warning')
}

Logger.prototype.log(`${lang.scch}`)
Loader.prototype.loadPlugins()
setTimeout(() => { ConsoleCommandSender.prototype.start() }, 900)

let server
try {
    server = Bedrock.createServer({
        host: config.host,
        port: config.port,
        version: config.version,
        conLog: true,
        offline: config.offlinemode,
        maxPlayers: config.maxplayers,
        motd: {
            motd: config.motd,
            levelName: config.softwarename
        }
    })
    Logger.prototype.log(`${lang.listening_on.replace(`%ipport%`, `/${config.host}:${config.port}`)}`)
} catch (e) {
    Logger.prototype.log(`${lang.listening_failed.replace(`%ipport%`, `/${config.host}:${config.port}`).replace('%error%', e)}`, 'error')
    process.exit(-1)
}

server.on('connect', client => {
    client.on('join', () => {
        Logger.prototype.log(lang.playerconnected.replace('%player%', client.getUserData().displayName))

        client.write('resource_packs_info', {
            must_accept: false,
            has_scripts: false,
            behaviour_packs: [],
            texture_packs: []
        })

        fs.readdir("./plugins", (err, plugins) => {
            plugins.forEach(plugin => {
                try {
                    require(`../plugins/${plugin}`).prototype.onResourcePackInfoSent(server, client)
                } catch (e) {
                    Logger.prototype.log(lang.failedtoexecuteonresourcepackinfosent.replace('%plugin%', plugin).replace('%e%', e.stack, 'error'), 'error')
                }
            });
        });

        clients.push(client)
        PlayerInfo.prototype.setPlayers(clients)
    })

    function handlepk(client, packet) {
        switch (packet.data.name) {
            case "resource_pack_client_response":
                switch (packet.data.params.response_status) {
                    case 'none': {
                        Logger.prototype.log(lang.norpsinstalled.replace('%player%', client.getUserData().displayName))
                        fs.readdir("./plugins", (err, plugins) => {
                            plugins.forEach(plugin => {
                                try {
                                    require(`../plugins/${plugin}`).prototype.onPlayerHasNoResourcePacksInstalled(server, client)
                                } catch (e) {
                                    Logger.prototype.log(Logger.prototype.log(lang.failedtoexecuteonplayerhasnoresourcepacksinstalled.replace('%plugin%', plugin).replace('%e%', e.stack, 'error')), 'error')
                                }
                            });
                        });
                    }
                    case 'refused': {
                        fs.readdir("./plugins", (err, plugins) => {
                            plugins.forEach(plugin => {
                                try {
                                    require(`../plugins/${plugin}`).prototype.onResourcePacksRefused(server, client)
                                } catch (e) {
                                    Logger.prototype.log(lang.failedtoexecuteonresourcepacksrefused.replace('%plugin%', plugin).replace('%e%', e.stack, 'error'), 'error')
                                }
                            });
                        });
                        Logger.prototype.log(lang.rpsrefused.replace('%player%', client.getUserData().displayName))
                        client.kick(lang.resource_packs_refused)
                    }
                    case 'have_all_packs': {
                        fs.readdir("./plugins", (err, plugins) => {
                            plugins.forEach(plugin => {
                                try {
                                    require(`../plugins/${plugin}`).prototype.onPlayerHaveAllPacks(server, client)
                                } catch (e) {
                                    Logger.prototype.log(lang.failedtoexecuteonplayerhaveallpacks.replace('%plugin%', plugin).replace('%e%', e.stack, 'error'), 'error')
                                }
                            });
                        });
                        Logger.prototype.log(lang.rpsinstalled.replace('%player%', client.getUserData().displayName))

                        client.write('resource_pack_stack', {
                            must_accept: false,
                            behavior_packs: [],
                            resource_packs: [],
                            game_version: '',
                            experiments: [],
                            experiments_previously_used: false
                        })
                        break
                    }
                    case 'completed': {
                        fs.readdir("./plugins", (err, plugins) => {
                            plugins.forEach(plugin => {
                                try {
                                    require(`../plugins/${plugin}`).prototype.onResourcePacksCompleted(server, client)
                                } catch (e) {
                                    Logger.prototype.log(lang.failedtoexecuteonresourcepackscompleted.replace('%plugin%', plugin).replace('%e%', e.stack, 'error'))
                                }
                            });
                        });
                        if (client.getUserData().displayName.length < 3) {
                            client.kick(lang.username_is_too_short)
                            return
                        }

                        if (client.getUserData().displayName.length > 16) {
                            if (config.offlinemode) return
                            client.kick(lang.username_is_too_long)
                            return
                        }

                        Logger.prototype.log(lang.joined.replace('%player%', client.getUserData().displayName))
                        client.write('player_list', get('player_list'))
                        client.write('start_game', get('start_game'))
                        client.write('set_spawn_position', get('set_spawn_position'))
                        client.write('set_commands_enabled', { enabled: true })
                        client.write('biome_definition_list', get('biome_definition_list'))
                        client.write('available_entity_identifiers', get('available_entity_identifiers'))
                        client.write('creative_content', get('creative_content'))
                        client.write('respawn', get('respawn'))


                        client.chat = function (msg) {
                            client.write('text', {
                                type: 'announcement',
                                needs_translation: false,
                                source_name: '',
                                message: msg,
                                xuid: '',
                                platform_chat_id: ''
                            })
                        }


                        client.kick = function (msg) {
                            if (client.kicked) return
                            fs.readdir("./plugins", (err, plugins) => {
                                plugins.forEach(plugin => {
                                    try {
                                        require(`../plugins/${plugin}`).prototype.onKick(server, client, msg)
                                    } catch (e) {
                                        Logger.prototype.log(lang.failedtoexecuteonkick.replace('%plugin%', plugin).replace('%e%', e.stack), 'error')
                                    }
                                });
                            });
                            client.kicked = true
                            Logger.prototype.log(lang.kicked_consolemsg.replace('%player%', client.getUserData().displayName).replace('%reason%', msg))
                            try { client.disconnect(msg) } catch (e) { }
                        }

                        setInterval(() => {
                            if (client.q) {
                                fs.readdir("./plugins", (err, plugins) => {
                                    plugins.forEach(plugin => {
                                        try {
                                            require(`../plugins/${plugin}`).prototype.onLeave(server, client)
                                        } catch (e) {
                                            Logger.prototype.log(lang.failedtoexecuteonplayerspawn.replace('%plugin%', plugin).replace('%e%', e.stack), 'error')
                                        }
                                    });
                                });
                                if (!client.kicked) {
                                    client.kick(lang.player_disconnected_from_this_server)
                                    Logger.prototype.log(lang.disconnected.replace('%player%', client.getUserData().displayName))
                                }
                                for (let i = 0; i < clients.length; i++) {
                                    clients[i].chat(lang.leftthegame.replace('%username%', client.getUserData().displayName))
                                }
                                delete client.q;
                            }
                        }, 10) 

                        Logger.prototype.log(lang.spawned.replace('%player%', client.getUserData().displayName))
                        setTimeout(() => {
                            if (client.q) return
                            client.write('play_status', {
                                status: 'player_spawn'
                            })
                            fs.readdir("./plugins", (err, plugins) => {
                                plugins.forEach(plugin => {
                                    try {
                                        require(`../plugins/${plugin}`).prototype.onPlayerSpawn(server, client)
                                    } catch (e) {
                                        Logger.prototype.log(lang.failedtoexecuteonplayerspawn.replace('%plugin%', plugin).replace('%e%', e.stack), 'error')
                                    }
                                });
                            });
                        }, config.clientloadtime)


                        for (let i = 0; i < clients.length; i++) {
                            clients[i].chat(lang.joinedthegame.replace('%username%', client.getUserData().displayName))
                        }

                        break
                    }
                    default: {
                        console.warn(lang.unhandledpacketdata.replace('%data%', packet.data.params.response_status))
                    }
                }
                break
            case "client_to_server_handshake":
            case "request_chunk_radius":
            case "set_local_player_as_initialized":
            case "tick_sync":
            case "emote_list":
            case "set_player_game_type":
            case "client_cache_status":
            case "move_player":
                Logger.prototype.log(`${lang.ignoredpacket.replace('%packet%', packet.data.name)}`, 'debug')
                break
            case "text":
                let msg = packet.data.params.message;
                let fullmsg = lang.chatformat.replace('%username%', client.getUserData().displayName).replace('%message%', msg);
                fs.readdir("./plugins", (err, plugins) => {
                    plugins.forEach(plugin => {
                        try {
                            require(`../plugins/${plugin}`).prototype.onChat(server, client, msg, fullmsg)
                        } catch (e) {
                            Logger.prototype.log(lang.failedtoexecuteonchat.replace('%plugin%', plugin).replace('%e%', e.stack), 'error')
                        }
                    });
                });
                Logger.prototype.log(lang.chatmessage.replace('%message%', fullmsg))
                if (msg.includes("§") || msg.length == 0 || msg.length > 255 && config.blockinvalidmessages) {
                    Logger.prototype.log(lang.illegalmessage.replace('%msg%', msg).replace('%player%', client.getUserData().displayName), 'warning')
                    client.kick(lang.invalid_chat_message)
                    return
                }

                for (let i = 0; i < clients.length; i++) {
                    clients[i].chat(`${fullmsg}`)
                }
                break
            case "command_request":
                let cmd = packet.data.params.command.toLowerCase();
                fs.readdir("./plugins", (err, plugins) => {
                    plugins.forEach(plugin => {
                        try {
                            require(`../plugins/${plugin}`).prototype.onCommand(server, client, cmd)
                        } catch (e) {
                            Logger.prototype.log(lang.failedtoexecuteoncommand.replace('%plugin%', plugin).replace('%e%', e.stack), 'error')
                        }
                    });
                });
                Logger.prototype.log(lang.executedcmd.replace('%player%', client.getUserData().displayName).replace('%cmd%', cmd))
                switch (cmd.toLowerCase()) {
                    case lang.command_ver:
                        if (!commands.player_command_ver) {
                            client.chat(lang.playerunknowncommand)
                            return
                        }
                        client.chat(lang.playervercommandline1.replace('%version%', ServerInfo.serverversion))
                        client.chat(lang.playervercommandline2)
                        break
                    case lang.command_version:
                        if (!commands.player_command_ver) {
                            client.chat(lang.playerunknowncommand)
                            return
                        }
                        client.chat(lang.playervercommandline1.replace('%version%', ServerInfo.serverversion))
                        client.chat(lang.playervercommandline2)
                        break
                    case lang.command_cmds:
                        if (!commands.player_command_cmds) {
                            client.chat(lang.playerunknowncommand)
                            return
                        }
                        client.chat(lang.commands)
                        client.chat(lang.commandsline1)
                        client.chat(lang.commandsline2)
                        client.chat(lang.commandsline3)
                        client.chat(lang.commandsline4)
                        break
                    case lang.command_commands: {
                        if (!commands.player_command_commands) {
                            client.chat(lang.playerunknowncommand)
                            return
                        }
                        client.chat(lang.commandsline1)
                        client.chat(lang.commandsline2)
                        client.chat(lang.commandsline3)
                        client.chat(lang.commandsline4)
                        break
                    }
                    default:
                        client.chat(lang.playerunknowncommand)
                        break
                }
                break
            default:
                Logger.prototype.log(lang.unhandledpacket, 'warning')
                console.log('%o', packet)
        }
    }

    client.on('packet', (packet) => {
        try {
            handlepk(client, packet)
        } catch (e) {
            client.kick(lang.internal_server_error)
            fs.readdir("./plugins", (err, plugins) => {
                plugins.forEach(plugin => {
                    try {
                        require(`../plugins/${plugin}`).prototype.onInternalServerError(server, client, err)
                    } catch (e) {
                        Logger.prototype.log(lang.failedtoexecuteoninternalservererror.replace('%plugin%', plugin).replace('%e%', e.stack), 'error')
                    }
                });
            });
            Logger.prototype.log(lang.handlepacketexception.replace('%player%', client.getUserData().displayName).replace('%error%', e.stack), 'error')
        }
    })
})
