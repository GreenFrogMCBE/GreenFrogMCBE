const bedrock = require('bedrock-protocol')
const config = require('../config.json')
const server = bedrock.createServer({
    host: config.host,
    port: config.port,
    version: config.version,
    conLog: true,
    offline: config.offlinemode,
    maxPlayers: config.maxplayers,
    motd: {
        motd: config.motd,
        levelName: 'greenfrogmcbe'
    }
})

let clients = []

const get = (packetName) => require(`./pks/${packetName}.json`)

process.env.DEBUG = 'bedrock-protocol'

console.log(`Listening on port /${config.host}:${config.port}`)

server.on('connect', client => {
    client.on('join', () => {
        console.log(`${client.getUserData().displayName} joined`)

        client.write('resource_packs_info', {
            must_accept: false,
            has_scripts: false,
            behaviour_packs: [],
            texture_packs: []
        })

        clients.push(client)
    })

    function handlepk(client, packet) {
        try {
            console.log('%o', packet)
            if (packet.data.name == 'resource_pack_client_response') {
                switch (packet.data.params.response_status) {
                    case 'none': {
                        console.log(`${client.username} does not have resource packs installed`)
                    }
                    case 'refused': {
                        console.log(`${client.username} refused resource packs`)
                        client.disconnect('Resource packs refused')
                    }
                    case 'have_all_packs': {
                        console.log(`${client.getUserData().displayName} does have all resource packs installed `)

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
                        console.log(`${client.getUserData().displayName} completed login process, writing packets`)
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
                        console.log(`${client.getUserData().displayName} done writing packets`)

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
                            console.log(`${client.getUserData().displayName} spawned`)
                            client.write('play_status', {
                                status: 'player_spawn'
                            })
                        }, 6000)


                        try {
                            for (let i = 0; i < clients.length; i++) {
                                clients[i].chat(`§e${client.getUserData().displayName} joined the game`)
                            }
                        } catch (e) {
                            // best code ever
                            // just ignore the error
                        }
                        break
                    }
                    default: {
                        console.warn('Warning: Unhandled packet data: ' + packet.data.params.response_status)
                    }
                }
            } else if (packet.data.name === 'client_to_server_handshake' || packet.data.name === 'client_cache_status') {
                return
            } else if (packet.data.name === 'text') {
                try {
                    if (data.params.message.includes("§") || data.params.message.length == 0 || data.params.message > 255) {
                        console.log(`${client.username} sent a illegal message`)
                        client.disconnect(`Illegal message in chat`)
                        return
                    }
                    for (let i = 0; i < clients.length; i++) {
                        clients[i].chat(`<${client.getUserData().displayName}> ${data.params.message}`)
                    }
                } catch (e) {
                    // best code ever
                    // just ignore the error
                }
            } else if (packet.data.name === 'command_request') {
                let cmd = data.params.command.toLowerCase();
                console.log(`${client.getUserData().displayName} executed command: ${cmd}`)
                switch (cmd) {
                    case '/ver':
                    case '/version':
                        client.chat(`§7This server uses greenfrogmcbe 1.0`)
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
            }
            else {
                console.warn('Warning: Unhandled packet ')
                console.log('%o', packet)
            }
        } catch (e) {}
    }
    
    client.on('packet', (packet) => {
        try {
            handlepk(client, packet)
        } catch (e) {
            client.disconnect('Internal server error')
            console.error(e)
        }
    })
})
