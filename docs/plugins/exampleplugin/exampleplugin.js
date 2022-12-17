// WARNING: Do not delete any functions! It will trigger an error!
// This plugin contains all events and descriptions, so you can use this plugin as a docs

class ExamplePlugin {
    constructor() { }

    getName() {
        return "Example plugin" // Your plugin name
    }

    onLoad() {
        // This code executes when your plugin is loaded
        console.log(`I was loaded`)
    }

    getServerVersion() {
        return "1.1" // The SERVER version that your plugin is made for
    }

    getVersion() {
        return "1.0" // Your PLUGIN version
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
        console.log(`Oh no! Player got kicked: ${msg}`)
    }

    onPlayerSpawn(server, client) {
        // This code executes when player is spawned (this event triggers after onJoin() event)
    }

    onChat(server, client, msg, fullmsg) {
        // This code executes when player uses chat
        console.log(`Client used chat: ${msg}`)
    }

    onCommand(server, client, command) {
        // This code executes when player executes a command
        console.log(`Client executed this command: ${command}`)
    }

    onConsoleCommand(command) {
        // This code executes when console executes a command
        console.log(`Console executed this command: ${command}`)
    }

    onInternalServerError(server, client, error) {
        // This code executes when there is an server error
        console.log(`Oh no! There was an server error: ${error}`)
    }
}

module.exports = ExamplePlugin;
