const Bedrock = require('bedrock-protocol')
const Logger = require('../src/console/Logger')
const ConsoleCommandSender = require('../src/console/ConsoleCommandSender')
const ServerInfo = require('../src/api/ServerInfo')
const ValidateConfig = require('../src/server/ValidateConfig')
const Loader = require('../src/plugins/Loader')
const fs = require('fs')
let clients = []

ValidateConfig.prototype.ValidateConfig()
ValidateConfig.prototype.ValidateLangFile()

const config = require('../config.json')
const lang = require(`./lang/${config.lang}.json`)

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
            levelName: 'GreenFrogMCBE'
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
                    Logger.prototype.log(`Failed to execute onResourcePackInfoSent(server, client) event for plugin "${plugin}". The error was: ${e}`, 'error')
                }
            });
        });

        clients.push(client)
        ServerInfo.prototype.setPlayers(clients)
    })

    function handlepk(client, packet) {
        if (packet.data.name == 'resource_pack_client_response') {
            switch (packet.data.params.response_status) {
                case 'none': {
                    Logger.prototype.log(lang.norpsinstalled.replace('%player%', client.getUserData().displayName))
                    fs.readdir("./plugins", (err, plugins) => {
                        plugins.forEach(plugin => {
                            try {
                                require(`../plugins/${plugin}`).prototype.onPlayerHasNoResourcePacksInstalled(server, client)
                            } catch (e) {
                                Logger.prototype.log(`Failed to execute onPlayerHasNoResourcePacksInstalled(server, client) event for plugin "${plugin}". The error was: ${e}`, 'error')
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
                                Logger.prototype.log(`Failed to execute onResourcePacksRefused(server, client) event for plugin "${plugin}". The error was: ${e}`, 'error')
                            }
                        });
                    });
                    Logger.prototype.log(lang.rpsrefused.replace('%player%', client.getUserData().displayName))
                    client.kick(lang.kick__resource_packs_refused)
                }
                case 'have_all_packs': {
                    fs.readdir("./plugins", (err, plugins) => {
                        plugins.forEach(plugin => {
                            try {
                                require(`../plugins/${plugin}`).prototype.onPlayerHaveAllPacks(server, client)
                            } catch (e) {
                                Logger.prototype.log(`Failed to execute onPlayerHaveAllPacks(server, client) event for plugin "${plugin}". The error was: ${e}`, 'error')
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
                                Logger.prototype.log(`Failed to execute onResourcePacksCompleted(server, client) event for plugin "${plugin}". The error was: ${e}`, 'error')
                            }
                        });
                    });
                    if (client.getUserData().displayName.length < 3) {
                        client.kick(lang.kick__username_is_too_short)
                        return
                    }

                    if (client.getUserData().displayName.length > 16) {
                        if (config.offlinemode) return
                        client.kick(lang.kick__username_is_too_long)
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
                    Logger.prototype.log(`Sent respawn`, 'debug')
                    client.queue('respawn', get('respawn'))
                    Logger.prototype.log(`Sent chunks`, 'debug')


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
                        fs.readdir("./plugins", (err, plugins) => {
                            plugins.forEach(plugin => {
                                try {
                                    require(`../plugins/${plugin}`).prototype.onKick(server, client, msg)
                                } catch (e) {
                                    Logger.prototype.log(`Failed to execute onKick(server, client, msg) event for plugin "${plugin}". The error was: ${e}`, 'error')
                                }
                            });
                        });
                        Logger.prototype.log(lang.kicked_consolemsg.replace('%player%', client.getUserData().displayName).replace('%reason%', msg))
                        client.disconnect(msg)
                    }

                    Logger.prototype.log(lang.spawned.replace('%player%', client.getUserData().displayName))
                    setTimeout(() => {
                        client.write('play_status', {
                            status: 'player_spawn'
                        })
                        fs.readdir("./plugins", (err, plugins) => {
                            plugins.forEach(plugin => {
                                try {
                                    require(`../plugins/${plugin}`).prototype.onPlayerSpawn(server, client)
                                } catch (e) {
                                    Logger.prototype.log(`Failed to execute onPlayerSpawn(server, client) event for plugin "${plugin}". The error was: ${e}`, 'error')
                                }
                            });
                        });
                        client.write('level_chunk', get('level_chunk'))
                    }, 2000)


                    for (let i = 0; i < clients.length; i++) {
                        clients[i].chat(lang.joinedthegame.replace('%username%', client.getUserData().displayName))
                    }

                    break
                }
                default: {
                    console.warn(lang.unhandledpacketdata.replace('%data%', packet.data.params.response_status))
                }
            }
        } else if (packet.data.name === 'client_to_server_handshake' || packet.data.name === 'request_chunk_radius' || packet.data.name === 'set_local_player_as_initialized' || packet.data.name === 'tick_sync' || packet.data.name === 'set_player_game_type' || packet.data.name === 'client_cache_status') {
            return
        } else if (packet.data.name === 'text') {
            let msg = packet.data.params.message;
            let fullmsg = lang.chat__chatformat.replace('%username%', client.getUserData().displayName).replace('%message%', msg);
            fs.readdir("./plugins", (err, plugins) => {
                plugins.forEach(plugin => {
                    try {
                        require(`../plugins/${plugin}`).prototype.onChat(server, client, msg, fullmsg)
                    } catch (e) {
                        Logger.prototype.log(`Failed to execute onChat(server, client, msg, fullmsg) event for plugin "${plugin}". The error was: ${e}`, 'error')
                    }
                });
            });
            Logger.prototype.log(lang.chatmessage + fullmsg)
            if (msg.includes("§") || msg.length == 0 || msg > 255 && config.blockinvalidmessages) {
                Logger.prototype.log(lang.illegalmessage.replace('%msg%', msg).replace('%player%', client.getUserData().displayName), 'warning')
                client.kick(lang.kick__invalid_chat_message)
                return
            }

		 Logger.prototype.log('msg length: ' + msg.replace(" ", '').length, 'debug')

            for (let i = 0; i < clients.length; i++) {
                clients[i].chat(`${fullmsg}`)
            }
        } else if (packet.data.name === 'command_request') {
            fs.readdir("./plugins", (err, plugins) => {
                plugins.forEach(plugin => {
                    try {
                        require(`../plugins/${plugin}`).prototype.onCommand(server, client, command)
                    } catch (e) {
                        Logger.prototype.log(`Failed to execute onCommand(server, client, command) event for plugin "${plugin}". The error was: ${e}`, 'error')
                    }
                });
            });
            let cmd = packet.data.params.command.toLowerCase();
            Logger.prototype.log(lang.executedcmd.replace('%player%', client.getUserData().displayName).replace('%cmd%', cmd))
            switch (cmd) { // TODO: Translate chat
                case '/ver':
                case '/version':
                    client.chat(`§7This server uses GreenFrogMCBE`)
                    break
                case '/cmds':
                case '/commands': {
                    client.chat(`§6Commands: `)
                    client.chat(`§6/ver - server version`)
                    client.chat(`§6/version - server version`)
                    client.chat(`§6/cmds - commands list`)
                    client.chat(`§6/commands - commands list`)
                    break
                }
                default:
                    client.chat(`§cUnknown command. Type /commands for a list of commands`)
                    break
            }
        } else {
            Logger.prototype.log(lang.unhandledpacket, 'warning')
            console.log('%o', packet)
        }
    }

    client.on('packet', (packet) => {
        try {
            handlepk(client, packet)
        } catch (e) {
            client.kick(config.kick__internal_server_error)
            fs.readdir("./plugins", (err, plugins) => {
                plugins.forEach(plugin => {
                    try {
                        require(`../plugins/${plugin}`).prototype.onInternalServerError(server, client, err)
                    } catch (e) {
                        Logger.prototype.log(`Failed to execute onInternalServerError(server, client, err) event for plugin "${plugin}". The error was: ${e}`, 'error')
                    }
                });
            });
            Logger.prototype.log(lang.handlepacketexception.replace('%player%', client.getUserData().displayName).replace('%error%', e.stack), 'error')
        }
    })
})
