/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const CommandManager = require("../src/player/CommandManager");
const ToastManager = require("../src/player/Toast");
const ShutdownAPI = require("../src/server/ShutdownAPI");
const GameMode = require("../src/player/GameMode");

const Logger = require("../src/server/Logger"); // Creates logger for this plugin
const Form = require("../src/player/Form");

// For advanced docs look at API.md in /docs/api.md

// This is a simple plugin that tests the GreenFrog's api
// Another example: https://github.com/andriycraft/GreenFrogMCBE/blob/main/plugins/DonationReminder.js

module.exports = {
  name: "ExamplePlugin", // Your plugin name
  version: "1.3", // Your plugin version

  onLoad() {
    Logger.log(`${this.name} > Hello world!`);
  },

  onShutdown() {
    Logger.log(`${this.name} > Good bye!`);
  },

  onJoin(server, client) {
    // This code executes when player joined
  },

  // REMEMBER: You can just remove events that you don't use

  onLeave(server, client) {
    // This code executes when player left the server
  },

  onPlayerHasNoResourcePacksInstalled(server, client) {},
  onResourcePacksRefused(server, client) {},
  onPlayerHaveAllPacks(server, client) {},
  onResourcePacksCompleted(server, client) {},

  onKick(server, client, msg) {
    // This code executes when player is kicked
  },

  onPlayerSpawn(server, client) {
    // Registers a command
    const cmdmanager = new CommandManager();
    cmdmanager.addCommand(client, "testcommand", "This is my first command!");
    cmdmanager.addCommand(
      client,
      "stopserver",
      "Stop server command that is registered by the example plugin"
    );
    // addCommand syntax: ("name", "description")

    // This code executes when player is spawned (this event executes after onJoin() event)
  },

  onChat(server, client, message) {
    client.sendMessage(client, "Your just sent a chat message: " + message);
    // This code executes when player uses chat
  },

  onCommand(server, client, command) {
    switch (command.toLowerCase()) {
      case "/testcommand":
        // client.username returns the client's username
        // client.ip returns the client's ip without port
        // client.port returns the client's connection port
        // client.fullip returns client's ip and port
        // client.gamemode returns client's gamemode
        // client.offline checks if the client is online or not
        // client.op returns the client's op status
        // client.permlevel returns the client's permission level
        client.sendMessage(`Hi ${client.username}. Your IP is: ${client.ip}`); // This code sends message TO client
        client.chat(`This message was sent by ${this.name}`); // This code sends message AS A client
        client.setGamemode(GameMode.CREATIVE); // This updates the client gamemode. Valid gamemodes are: "creative", "survival", "adventure", "spectator" or "fallback"

        const Toast = new ToastManager();
        Toast.title = "Hello, world";
        Toast.message = "This is an example of a Toast";
        Toast.send(client);

        const form = new Form();
        form.buttons = [{ text: "Button 1" }];
        form.content = "Hello, world";
        form.title = "Hello, world (title)";
        form.type = "form";
        form.send(client);

        //              ^ title ^ toast description/body
        client.setTime(17000); // Updates the client time
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
        break;
      case "/stopserver":
        client.sendMessage("Stopping server...");
        ShutdownAPI.shutdownServer();
        break;
    }
  },

  onConsoleCommand(command, server) {
    // This code executes when console executes a command
  },

  onInternalServerError(server, client, error) {
    // This code executes when there is an server error
  },

  onPlayerMove(server, client, location) {
    // This code executes when player moves
  },

  onGamemodeChange(server, client, gamemode) {
    // This code executes when player changes his own gamemode
  },

  onServerToClientChat(server, client, msg) {
    // This code executes when server sends a chat message to client (useful for custom logging)
  },

  onToast(client, server, title, msg) {
    // This code executes when server sends toast to client
  },

  onTransfer(client, server, address, port) {
    // This code executes when player transfers to another server
    // WARNING: Functions like client.sendMessage(), client.transfer() will not work anymore on that player
  },

  onFormResponse(server, client, packet) {
    client.sendMessage("Response: " + JSON.stringify(packet).toString());
    // This code executes when:
    // a) Player clicks a button in a form
    // b) Player closes a form
    // c) Player inputs text into form
    // d) Player selects an option in a form
  },
};
