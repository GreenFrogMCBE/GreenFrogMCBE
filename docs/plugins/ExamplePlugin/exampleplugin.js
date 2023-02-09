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

// This is a simple plugin that tests the GreenFrog's API
// Another example: https://github.com/andriycraft/GreenFrogMCBEDonations

module.exports = {
  name: "ExamplePlugin", // Your plugin name
  version: "1.3", // Your plugin version

  onLoad() {
    Logger.log(`${this.name} > Hello world!`);
  },

  onShutdown() {
    Logger.log(`${this.name} > Good bye!`);
  },

  onJoin(server, player) {
    // This code executes when player joined
  },

  // REMEMBER: You can just remove events that you don't use

  onLeave(server, player) {
    // This code executes when player left the server
  },

  onPlayerHasNoResourcePacksInstalled(server, player) {},
  onResourcePacksRefused(server, player) {},
  onPlayerHaveAllPacks(server, player) {},
  onResourcePacksCompleted(server, player) {},

  onKick(server, player, msg) {
    // This code executes when player is kicked
  },

  onPlayerSpawn(server, player) {
    // Registers a command
    const cmdmanager = new CommandManager();
    cmdmanager.addCommand(player, "testcommand", "This is my first command!");
    cmdmanager.addCommand(
      player,
      "stopserver",
      "Stop server command that is registered by the example plugin"
    );
    // addCommand syntax: ("name", "description")

    // This code executes when player is spawned (this event executes after onJoin() event)
  },

  onChat(server, player, message) {
    player.sendMessage(player, "Your just sent a chat message: " + message);
    // This code executes when player uses chat
  },

  onCommand(server, player, command) {
    switch (command.toLowerCase()) {
      case "/testcommand":
        // player.username returns the player's username
        // player.ip returns the player's ip without port
        // player.port returns the player's connection port
        // player.fullip returns player's ip and port
        // player.gamemode returns player's gamemode
        // player.offline checks if the player is online or not
        // player.op returns the player's op status
        // player.permlevel returns the player's permission level
        player.sendMessage(`Hi ${player.username}. Your IP is: ${player.ip}`); // This code sends message TO player
        player.chat(`This message was sent by ${this.name}`); // This code sends message AS A player
        player.setGamemode(GameMode.CREATIVE); // This updates the player gamemode. Valid gamemodes are: "creative", "survival", "adventure", "spectator" or "fallback"

        const Toast = new ToastManager();
        Toast.title = "Hello, world";
        Toast.message = "This is an example of a Toast";
        Toast.send(player);

        const form = new Form();
        form.buttons = [{ text: "Button 1" }];
        form.content = "Hello, world";
        form.title = "Hello, world (title)";
        form.type = "form";
        form.send(player);

        //              ^ title ^ toast description/body
        player.setTime(17000); // Updates the player time
        setTimeout(() => {
          if (!player.offline) {
            // Make sure to check if the player is still online after doing setTimeout() that uses player API in production plugins
            player.transfer("172.0.0.1", 19132); // Moves player to another server
            //              ^ ip         ^ port
          }
        }, 30000);

        // ADVANCED API
        // player.write(packet_name, json_packet_data)
        // player.disconnect("reason") // force disconnect the player - may break other plugins
        break;
      case "/stopserver":
        player.sendMessage("Stopping server...");
        ShutdownAPI.shutdownServer();
        break;
    }
  },

  onConsoleCommand(command, server) {
    // This code executes when console executes a command
  },

  onInternalServerError(server, player, error) {
    // This code executes when there is an server error
  },

  onPlayerMove(server, player, location) {
    // This code executes when player moves
  },

  onGamemodeChange(server, player, gamemode) {
    // This code executes when player changes his own gamemode
  },

  onServerToplayerChat(server, player, msg) {
    // This code executes when server sends a chat message to player (useful for custom logging)
  },

  onToast(player, server, title, msg) {
    // This code executes when server sends toast to player
  },

  onTransfer(player, server, address, port) {
    // This code executes when player transfers to another server
    // WARNING: Functions like player.sendMessage(), player.transfer() will not work anymore on that player
  },

  onFormResponse(server, player, packet) {
    player.sendMessage("Response: " + JSON.stringify(packet).toString());
    // This code executes when:
    // a) Player clicks a button in a form
    // b) Player closes a form
    // c) Player inputs text into form
    // d) Player selects an option in a form
  },
};
