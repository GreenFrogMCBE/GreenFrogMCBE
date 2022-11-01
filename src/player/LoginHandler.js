const ServerInfo = require('../src/api/ServerInfo')
const Logger = require('../src/console/Logger')

class LoginHandler {
    constructor() { 
        this.clients = []
    }

    handle (client) { 
        Logger.prototype.log(`Player ${client.getUserData().displayName} joined`, 'info')

        client.write('resource_packs_info', {
            must_accept: false,
            has_scripts: false,
            behaviour_packs: [],
            texture_packs: []
        })

        clients.push(client)
        ServerInfo.prototype.setPlayers(this.clients)
    }
}

module.exports = LoginHandler; 