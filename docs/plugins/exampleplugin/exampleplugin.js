const BasePlugin = require("../src/plugins/BasePlugin");
const CommandManager = require("../src/player/CommandManager");

const log = require("../src/server/Logger");
const Logger = new log(); // Creates logger for this plugin

// This plugin contains all list of events
// Another example: https://github.com/andriycraft/GreenFrogMCBE/blob/main/plugins/DonationReminder.js

class Exampleplugin extends BasePlugin {
  constructor() {}

  getName() {
    return "ExamplePlugin"; // Your plugin name
  }

  onLoad() {
    // PLEASE DO NOT USE LOGGER.LOG() IN PLUGINS
    Logger.pluginLog(
      "info", // Log level. See API.md for docs
      this.getName(), // Plugin name
      "Hello, world", // Message
      "[", // Prefix
      "]" // Suffix
    );
  }

  onShutdown() {
    Logger.pluginLog(
      "info", // Log level. See API.md for docs
      this.getName(), // Plugin name
      "Goodbye", // Message
      "[", // Prefix
      "]" // Suffix
    );
  }

  getServerVersion() {
    return "1.5"; // The SERVER version that your plugin is made for
  }

  getVersion() {
    return "1.2"; // Your PLUGIN version
  }

  onJoin(server, client) {
    // This code executes when player joined
  }

  // REMEMBER: You can just remove events that you don't use

  onLeave(server, client) {
    // This code executes when player left the server
  }

  onPlayerHasNoResourcePacksInstalled(server, client) {}
  onResourcePacksRefused(server, client) {}
  onPlayerHaveAllPacks(server, client) {}
  onResourcePacksCompleted(server, client) {}

  onKick(server, client, msg) {
    // This code executes when player is kicked
  }

  onPlayerSpawn(server, client) {
    // Registers a command
    const cmdmanager = new CommandManager();
    cmdmanager.addCommand(client, "testcommand", "This is my first command!");
    // addCommand syntax: ("name", "description")
    // This code executes when player is spawned (this event executes after onJoin() event)
  }

  onChat(server, client, message) {
    client.sendMessage(client, "This message was sent using GFMCBE API!");
    // This code executes when player uses chat
  }

  onCommand(server, client, command) {
    if (command.toLowerCase() === "/testcommand") {
      // client.username returns the client's username
      // client.ip returns the client's ip without port
      // client.port returns the client's connection port
      // client.fullip returns client's ip and port
      // client.gamemode returns client's gamemode
      // client.offline checks if the client is online or not
      client.sendMessage(`Hi ${client.username}. Your IP is: ${client.ip}`); // This code sends message TO client
      client.chat(`This message was sent by ${this.getName()}`); // This code sends message AS A client
      client.setGamemode("creative"); // This updates the client gamemode. Valid gamemodes are: "creative", "survival", "adventure", "spectator" or "fallback"
      client.sendToast("Hi", "This a toast notification");
      //              ^ title ^ toast description/body
      client.setTime(17000); // Updates the client time
      client.sendForm(5555, "text", [{ text: "Button 1" }], "title", "form");
      setTimeout(() => {
        if (!client.offline) {
          // Make sure to check if the client is still online after doing setTimeout() that uses client API in production plugins
          client.transfer("172.0.0.1", 19132); // Moves player to another server
          //              ^ ip         ^ port
        }
      }, 30000);

      // ADVANCED API
      // client.write(packet_name, json_packet_data)
      // client.disconnect("reason") // force disconnect the client - may break other plugins
    }
  }

  onConsoleCommand(command, server) {
    // This code executes when console executes a command
  }

  onInternalServerError(server, client, error) {
    // This code executes when there is an server error
  }

  onPlayerMove(server, client, location) {
    // This code executes when player moves
  }

  onGamemodeChange(server, client, gamemode) {
    // This code executes when player changes his own gamemode
  }

  onServerToClientChat(server, client, msg) {
    // This code executes when server sends a chat message to client (useful for custom logging)
  }

  onToast(client, server, title, msg) {
    // This code executes when server sends toast to client
  }

  onTransfer(client, server, address, port) {
    // This code executes when player transfers to another server
    // WARNING: Functions like client.sendMessage(), client.transfer() will not work anymore on that player
  }

  onFormResponse(server, client, packet) {
    client.sendMessage("Response: " + JSON.stringify(packet).toString());
    // This code executes when:
    // a) Player clicks a button in a form
    // b) Player closes a form
    // c) Player inputs text into form
    // d) Player selects an option in a form
  }
}

module.exports = Exampleplugin;
