const bedrock = require('bedrock-protocol')
const Logger = require('../src/console/Logger')
const ConsoleCommandSender = require('../src/console/ConsoleCommandSender')
const ServerInfo = require('../src/api/ServerInfo')
const PacketHandler = require('../src/player/PacketHandler')
const LoginHandler = require('../src/player/LoginHandler')

Logger.prototype.log('Loading server')

try {
    const config = require('../config.json')
} catch (e) {
    Logger.prototype.log(`Failed to load config`, 'error')
    process.exit(1)
}

const config = require('../config.json')
const server = bedrock.createServer({
    host: config.host,
    port: config.port,
    version: config.version,
    conLog: true,
    offline: config.offlinemode,
    maxPlayers: config.maxplayers,
    encryption: false, // only for now, bedrock-protocol needs to be fixed
    motd: {
        motd: config.motd,
        levelName: 'GreenFrogMCBE'
    }
})

const get = (packetName) => require(`./network/packets/${packetName}.json`)


Logger.prototype.log(`Listening on port /${config.host}:${config.port}`, 'info')
ConsoleCommandSender.prototype.start()


server.on('connect', client => {
    client.on('join', () => {
        LoginHandler.prototype.handle(client)
    })



    client.on('packet', (packet) => {
        try {
            PacketHandler.prototype.handle(client, packet)
        } catch (e) {
            client.disconnect(config.internal_server_error)
            Logger.prototype.log(`Exception in task 'Packet handling': ${e}`, 'error')
        }
    })
})

