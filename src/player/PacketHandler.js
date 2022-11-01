const Logger = require('../console/Logger')

class PacketHandler {
    constructor() { }

    handle(client, packet) {
        const get = (packetName) => require(`./network/packets/${packetName}.json`)

        if (packet.data.name == 'resource_pack_client_response') {
            switch (packet.data.params.response_status) {
                case 'none': {
                    Logger.prototype.log(`${client.username} does not have resource packs installed`)
                }
                case 'refused': {
                    Logger.prototype.log(`${client.username} refused resource packs`)
                    client.disconnect(config.resource_packs_refused)
                }
                case 'have_all_packs': {
                    Logger.prototype.log(`${client.getUserData().displayName} does have all resource packs installed `)

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
                    Logger.prototype.log(`Kicked ${client.getUserData().displayName} because he has invalid name`, `warning`)

                    if (client.getUserData().displayName.length < 3) {
                        client.disconnect(config.invalid_username_kick)
                        return
                    }

                    if (client.getUserData().displayName.length > 12) {
                        if (!config.offlinemode) return
                        client.disconnect(config.invalid_username_kick)
                        return
                    }

                    if (client.getUserData().displayName.length > 16) {
                        if (config.offlinemode) return
                        client.disconnect(config.invalid_username_kick)
                        return
                    }

                    Logger.prototype.log(`${client.getUserData().displayName} completed login process, writing packets`)
                    client.write('network_settings', { compression_threshold: 1 })


                    client.queue('player_list', get('player_list'))
                    client.queue('start_game', get('start_game'))
                    client.queue('item_component', { entries: [] })
                    client.queue('set_spawn_position', get('set_spawn_position'))
                    client.queue('set_time', { time: 0 })
                    client.queue('set_difficulty', { difficulty: 0 })
                    client.queue('set_commands_enabled', { enabled: true })
                    client.queue('biome_definition_list', get('biome_definition_list'))
                    client.queue('available_entity_identifiers', get('available_entity_identifiers'))
                    client.queue('creative_content', get('creative_content'))
                    Logger.prototype.log(`${client.getUserData().displayName} done writing packets`)

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


                    setTimeout(() => {
                        Logger.prototype.log(`${client.getUserData().displayName} spawned`)
                        client.write('play_status', {
                            status: 'player_spawn'
                        })
                    }, 6000)


                    for (let i = 0; i < clients.length; i++) {
                        clients[i].chat(`§e${client.getUserData().displayName} joined the game`)
                    }

                    break
                }
                default: {
                    console.warn('Warning: Unhandled packet data: ' + packet.data.params.response_status)
                }
            }
        } else if (packet.data.name === 'client_to_server_handshake' || packet.data.name === 'request_chunk_radius' || packet.data.name === 'set_local_player_as_initialized' || packet.data.name === 'tick_sync' || packet.data.name === 'set_player_game_type' || packet.data.name === 'client_cache_status') {
            return
        } else if (packet.data.name === 'text') {
            let msg = packet.data.params.message;
            let fullmsg = `<${client.getUserData().displayName}> ${msg}`;
            Logger.prototype.log(`(chat message) ` + fullmsg)
            if (msg.includes("§") || msg.length == 0 || msg > 255 && config.blockinvalidmessages) {
                Logger.prototype.log(`${client.getUserData().displayName} sent a illegal message. (message content was: ${msg.length}`, 'warning')
                client.disconnect(config.invalid_chat_message_kick)
                return
            }
            client.chat(`${fullmsg}`)
            for (let i = 0; i < clients.length; i++) {
                if (clients[i] == !client) { clients[i].chat(`${fullmsg}`) }
            }
        } else if (packet.data.name === 'command_request') {
            let cmd = packet.data.params.command.toLowerCase();
            Logger.prototype.log(`${client.getUserData().displayName} executed command: ${cmd}`)
            switch (cmd) {
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
                    client.chat(`§cUnknown command. Type /commands for a list of command`)
                    break
            }
        } else if (packet.data.name === 'disconnect') {
            Logger.prototype.log(`Player ${client.username} disconnected`, 'info')
        }
        else {
            Logger.prototype.log('Unhandled packet', 'warning')
            console.log('%o', packet)
        }

    }

}

module.exports = PacketHandler;