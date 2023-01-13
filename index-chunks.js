process.env.DEBUG = process.argv.includes("--debug") ? "minecraft-protocol" : "";

const { Server } = require("bedrock-protocol");
const fs = require('fs')

const get = (packetName) => require(`./src/network/packets/${packetName}.json`)
const server = new Server({
    host: "0.0.0.0",
    port: 19132,
    version: "1.19.1",
    offline: process.argv.includes("--offline"),
    maxPlayers: 20,
    motd: {
        motd: "shit server",
        levelName: "kill me"
    }
});

server.on("connect", (client) => {
    client.on("join", () => {
        console.log("Client joined:", client.getUserData());

        client.write("resource_packs_info", {
            must_accept: false,
            has_scripts: false,
            behaviour_packs: [],
            texture_packs: [],
        });

        client.write("resource_pack_stack", {
            must_accept: false,
            behavior_packs: [],
            resource_packs: [],
            game_version: "",
            experiments: [],
            experiments_previously_used: false,
        });

        client.once("resource_pack_client_response", async () => {
            client.write('player_list', get('player_list'))
            client.write('start_game', get('start_game'))
            client.write('set_spawn_position', get('set_spawn_position'))
            client.write('set_commands_enabled', { enabled: true })
            client.write('biome_definition_list', get('biome_definition_list'))
            client.write('available_entity_identifiers', get('available_entity_identifiers'))
            client.write('creative_content', get('creative_content'))
            client.write('respawn', get('respawn'))

            for (const file of fs.readdirSync(`./world/Bedrock level/_greenfrog/hardcoded/chunks/`)) {
                const buffer = fs.readFileSync(`./world/Bedrock level/_greenfrog/hardcoded/chunks/` + file)
                console.log('Sending chunk', buffer)
                client.sendBuffer(buffer)
            }

            client.on("subchunk_request", (data) => { // TODO: fix 
                console.log("subchunk request:", data)
                client.write('subchunk', { // TODO: mabye the packet name is subchunk_response?
                    cache_enabled: false,
                    dimension: 0,
                    origin: { x: 0, y: 0, z: 0 },
                    entries: {
                        dx: 0,
                        dy: 0,
                        dz: 0,
                        result: 6,
                        payload: [],
                        heightmap_type: 0
                    }
                })
            })

            setTimeout(() => {
                client.write("play_status", { status: "player_spawn" });
            }, 6000);

            setInterval(() => {
                client.write("network_chunk_publisher_update", {
                    coordinates: { x: 0, y: 0, z: 0 },
                    radius: 64,
                    saved_chunks: [],
                })
            }, 50);

            client.on("tick_sync", (packet) => {
                client.write("tick_sync", {
                    request_time: packet.request_time,
                    response_time: BigInt(Date.now()),
                });
            });
        });
    });
});

server.listen();
console.log("Server listening on port %d.", server.options.port);