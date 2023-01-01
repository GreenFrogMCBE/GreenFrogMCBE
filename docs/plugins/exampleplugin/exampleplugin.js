const BasePlugin = require("../src/plugins/BasePlugin");
const Chatmessage = require("../src/player/Chatmessage");
const KickPlayer = require("../src/player/KickPlayer");
const Logger = require("../src/console/Logger");
const Colors = require("../src/chat/Colors");

// This plugin contains all list of events
// Another example: https://github.com/andriycraft/GreenFrogMCBE/blob/main/plugins/DonationReminder.js

class ExamplePlugin extends BasePlugin {
    constructor() { }

    getName() {
        return "Example plugin" // Your plugin name
    }

    onLoad() {
        Logger.prototype.pluginLog(
            'info', // Log level. See API.md for docs
            this.getName(), // Plugin name
            'Hello, world', // Message
            '[', // Prefix
            ']' // Suffix
        );
    }

    onShutdown() {
        Logger.prototype.pluginLog(
            'info', // Log level. See API.md for docs
            this.getName(), // Plugin name
            'Goodbye', // Message
            '[', // Prefix
            ']' // Suffix
        );
    }

    getServerVersion() {
        return "1.5" // The SERVER version that your plugin is made for
    }

    getVersion() {
        return "1.2" // Your PLUGIN version
    }

    onJoin(server, client) {
        // This code executes when player joined
    }

    // REMEMBER: You can just remove events that you don't use

    onLeave(server, client) {
        // This code executes when player left the server
    }

    onResourcePackInfoSent(server, client) { }
    onPlayerHasNoResourcePacksInstalled(server, client) { }
    onResourcePacksRefused(server, client) { }
    onPlayerHaveAllPacks(server, client) { }
    onResourcePacksCompleted(server, client) { }

    onKick(server, client, msg) {
        // This code executes when player is kicked
    }

    onPlayerSpawn(server, client) {
        // This code executes when player is spawned (this event triggers after onJoin() event)
    }

    onChat(server, client, msg, fullmsg) {
        Chatmessage.prototype.sendMessage(client, "This message was sent using GFMCBE API!")
        // This code executes when player uses chat
    }

    onCommand(server, client, command) {
        if (command.toLowerCase().startsWith("/test")) {
            Chatmessage.prototype.sendMessage(client, Colors.black + "if u read this text then u are gay")
            Chatmessage.prototype.broadcastMessage("bruh")
        }
        if (command.toLowerCase().startsWith("/kickme")) {
            KickPlayer.prototype.KickPlayer(Colors.red + "ok")
        }
    }

    onConsoleCommand(command) {
        // This code executes when console executes a command
    }

    onInternalServerError(server, client, error) {
        // This code executes when there is an server error
    }
}

module.exports = ExamplePlugin