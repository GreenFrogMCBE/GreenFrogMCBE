process.env.DEBUG = process.argv.includes("--debug") ? "minecraft-protocol" : "";

const bedrock = require('bedrock-protocol')
const Logger = require('./console/Logger')
const ServerInfo = require('./api/ServerInfo')
const PlayerInfo = require('./player/PlayerInfo')
const ValidateConfig = require('./server/ValidateConfig')
const Loader = require('./plugins/Loader')
const Text = require('./network/packets/Text')
const Respawn = require('./network/packets/Respawn')
const SubChunk = require('./network/packets/SubChunk')
const TickSync = require('./network/packets/TickSync')
const StartGame = require('./network/packets/StartGame')
const PlayerList = require('./network/packets/PlayerList')
const LevelChunk = require('./network/packets/LevelChunk')
const PlayStatus = require('./network/packets/PlayStatus')
const UpdateBlock = require('./network/packets/UpdateBlock')
const CreativeContent = require('./network/packets/CreativeContent')
const ResponsePackInfo = require('./network/packets/ResponsePackInfo')
const ResourcePackStack = require('./network/packets/ResourcePackStack')
const ChunkRadiusUpdate = require('./network/packets/ChunkRadiusUpdate')
const ClientCacheStatus = require('./network/packets/ClientCacheStatus')
const SetCommandsEnabled = require('./network/packets/SetCommandsEnabled')
const BiomeDefinitionList = require('./network/packets/BiomeDefinitionList')
const AvailableEntityIdentifiers = require('./network/packets/AvailableEntityIdentifiers')
const NetworkChunkPublisherUpdate = require('./network/packets/NetworkChunkPublisherUpdate')
const fs = require('fs');
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

const get = (packetName) => require(`./network/dumpedpackets/${packetName}.json`)

if (config.donotcrashoncriticalerrors) { Logger.prototype.log(lang.unstablewarning, 'warning') }
if (config.debug) { Logger.prototype.log(lang.debugwarning, 'warning') }

Logger.prototype.log(`${lang.scch}`)
Loader.prototype.loadPlugins()

let server
try {
    server = bedrock.createServer({
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

        ResponsePackInfo.prototype.writePacket(client)

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
                        ResourcePackStack.prototype.writePacket(client)
                        break
                    }
                    case 'completed': {
                        fs.readdir("./plugins", (err, plugins) => {
                            plugins.forEach(plugin => {
                                try {
                                    require(`../plugins/${plugin}`).prototype.onResourcePacksCompleted(server, client)
                                } catch (e) {
                                    Logger.prototype.log(lang.failedtoexecuteonresourcepackscompleted.replace('%plugin%', plugin).replace('%e%', e.stack, 'error'), 'error')
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
                        PlayerList.prototype.writePacket(client, client.getUserData().displayName)
                        StartGame.prototype.writePacket(client)
                        SetCommandsEnabled.prototype.writePacket(client)
                        BiomeDefinitionList.prototype.writePacket(client)
                        AvailableEntityIdentifiers.prototype.writePacket(client)
                        CreativeContent.prototype.writePacket(client)
                        Respawn.prototype.writePacket(client)
                        ClientCacheStatus.prototype.writePacket(client)


                       setTimeout(() => {
                            UpdateBlock.prototype.writePacket(client, 0, 98, 0, 2)
                            for (let x = 0; x < 10; x++) {
                                for (let z = 0; z < 10; z++) {
                                    UpdateBlock.prototype.writePacket(client, x, 98, z, Math.floor(Math.random() * 1000))
                                }
                            }
                        }, 1000)
                        LevelChunk.prototype.writePacket(client)

                        client.on("subchunk_request", () => {
                            SubChunk.prototype.writePacket(client)
                        })

                        setInterval(() => {
                            if (client.q) return
                            NetworkChunkPublisherUpdate.prototype.writePacket(client)
                        }, 50)

                        client.chat = function (msg) {
                            Text.prototype.writePacket(client, msg)
                        }

                        client.kick = function (msg) {
                            if (client.kicked) return
                            if (msg == null || msg == undefined) msg = lang.playerdisconnected
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
                            PlayStatus.prototype.writePacket(client)
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


                        setTimeout(() => {
                            for (let i = 0; i < clients.length; i++) {
                                clients[i].chat(lang.joinedthegame.replace('%username%', client.getUserData().displayName))
                            }
                        }, 1000)

                        break
                    }
                    default: {
                        console.warn(lang.unhandledpacketdata.replace('%data%', packet.data.params.response_status))
                    }
                }
                break
            case "client_to_server_handshake":
            case "set_local_player_as_initialized":
                // Already handled by bedrock-protocol
                break
            case "tick_sync":
                TickSync.prototype.writePacket(client, packet, BigInt(Date.now()))
                break
            case "emote_list":
            case "set_player_game_type":
            case "client_cache_status":
            case "move_player":
            case "player_action":
                Logger.prototype.log(`${lang.ignoredpacket.replace('%packet%', packet.data.name)}`, 'debug')
                break
            case "request_chunk_radius":
                ChunkRadiusUpdate.prototype.writePacket(client, 32)
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
                if (msg.includes("§") || msg.length == 0 || msg.length > 255 && config.blockinvalidmessages) {
                    Logger.prototype.log(lang.illegalmessage.replace('%msg%', msg).replace('%player%', client.getUserData().displayName), 'warning')
                    client.kick(lang.invalid_chat_message)
                    return
                }

                if (!msg.replace(/\s/g, '').length) return

                Logger.prototype.log(lang.chatmessage.replace('%message%', fullmsg))

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
                if (cmd.toLowerCase().startsWith('/' + lang.command_ver.toLowerCase())) {
                    if (!commands.player_command_ver) {
                        client.chat(lang.playerunknowncommand)
                        return
                    }
                    client.chat(lang.playervercommandline1.replace('%version%', ServerInfo.serverversion))
                    client.chat(lang.playervercommandline2)
                    return
                }
                if (cmd.toLowerCase().startsWith('/' + lang.command_version.toLowerCase())) {
                    if (!commands.player_command_ver) {
                        client.chat(lang.playerunknowncommand)
                        return
                    }
                    client.chat(lang.playervercommandline1.replace('%version%', ServerInfo.serverversion))
                    client.chat(lang.playervercommandline2)
                    return
                }
                if (cmd.toLowerCase().startsWith('/' + lang.command_cmds.toLowerCase())) {
                    if (!commands.player_command_cmds) {
                        client.chat(lang.playerunknowncommand)
                        return
                    }
                    client.chat(lang.commands)
                    client.chat(lang.commandsline1)
                    client.chat(lang.commandsline2)
                    client.chat(lang.commandsline3)
                    client.chat(lang.commandsline4)
                    return
                }
                if (cmd.toLowerCase().startsWith('/' + lang.command_commands.toLowerCase())) {
                    if (!commands.player_command_commands) {
                        client.chat(lang.playerunknowncommand)
                        return
                    }
                    client.chat(lang.commandsline1)
                    client.chat(lang.commandsline2)
                    client.chat(lang.commandsline3)
                    client.chat(lang.commandsline4)
                    return
                }
                client.chat(lang.playerunknowncommand)
            default:
                Logger.prototype.log(lang.unhandledpacket, 'warning')
                console.log('%o', packet)
                break
        }
    }

    client.on('packet', (packet) => {
        try {
            handlepk(client, packet)
        } catch (e) {
            try { client.kick(lang.internal_server_error) } catch (e) { /* who cares? */ }
            client.disconnect(lang.internal_server_error)
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
