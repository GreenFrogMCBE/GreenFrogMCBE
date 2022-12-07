// WARNING: Do not delete any function!
// This plugin contains all events and descriptions, so you can use this plugin as a docs

class ExamplePlugin {
    constructor() {}

    getName() {
        return "Example plugin" // your plugin name
    }

    onLoad() {
        // This code executes when your plugin is loaded
        console.log(`I was loaded`)
    }

    onJoin(server, client) {
        // This code executes when player joined
        console.log(`A wild player appeared!`)
    }

    onResourcePackInfoSent(server, client) { }
    onPlayerHasNoResourcePacksInstalled(server, client) { }
    onResourcePacksRefused(server, client) { }
    onPlayerHaveAllPacks(server, client) { }
    onResourcePacksCompleted(server, client) { }

    onKick(server, client, msg) {
        // This code executes when player is kicked
        console.log(`Oh no! Player got kicked: ${msg} | :skull:`)
    }

    onPlayerSpawn(server, client) {
        // This code executes when player is spawned (this event starts after onJoin() event)
    }

    onChat(server, client, msg, fullmsg) {
        // This code executes when player uses chat
        console.log(`Client chated: ${msg}`)
    }

    onCommand(server, client, command) {
        // This code executes when player executes a command
        console.log(`Client executed this command: ${command}`)
    }

    onInternalServerError(server, client, error) {
        // This code executes when there is an server error
        console.log(`!!!! Server error: ${error}`)
    }

}

module.exports = ExamplePlugin;