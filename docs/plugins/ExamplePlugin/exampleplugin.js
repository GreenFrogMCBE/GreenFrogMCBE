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
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
const CommandManager = require("../../../src/player/CommandManager");
const ToastManager = require("../../../src/player/Toast");
const ShutdownAPI = require("../../../src/server/ShutdownAPI");
const GameMode = require("../../../src/player/GameMode");

const Logger = require("../../../src/server/Logger");
const Form = require("../../../src/player/Form");
const Colors = require("../../../src/player/Colors");
const FormTypes = require("../../../src/player/FormTypes");

// This is a simple plugin that tests the GreenFrog's API
// Another example: https://github.com/andriycraft/GreenFrogMCBEDonations

module.exports = {
  onLoad() {
    Logger.log(`Example > Hello, world`);
  },

  onShutdown() {
    Logger.log(`Example > Bye, world`);
  },

  PlayerJoinEvent(server, player, event) {
    Logger.log(`Player joined: ${player.username}`);
    // This code executes when player joined
  },

  // REMEMBER: You can just remove events that you don't use

  PlayerLeaveEvent(server, player, event) {
    Logger.log(`Player left: ${player.username}`);
    // This code executes when player left the server
  },

  PlayerHasNoResourcePacksInstalledEvent(server, player, event) {},
  onResourcePacksRefused(server, player, event) {},
  onPlayerHaveAllPacks(server, player, event) {},
  onResourcePacksCompleted(server, player, event) {},

  PlayerKickEvent(server, player, msg, event) {
    Logger.log(`Player got kicked! ${player.username}`);
    // This code executes when player is kicked
  },

  PlayerSpawnEvent(server, player, event) {
    Logger.log(`Player spawned! ${player.username}`);
    // Registers a command
    const cmdmanager = new CommandManager();
    cmdmanager.addCommand(player, "testcommand", "This is my first command!");
    cmdmanager.addCommand(player, "kick", "Kicks u!");
    cmdmanager.addCommand(
      player,
      "stopserver",
      "Stop server command that is registered by the example plugin"
    );
    // addCommand syntax: ("name", "description")

    // This code executes when player is spawned (this event executes after onJoin() event)
  },

  PlayerChatEvent(server, player, message, event) {
    Logger.log(`${player.username} said "${message}"`);
    player.sendMessage(player, "Your just sent a chat message: " + message);
    // This code executes when player uses chat
  },

  PlayerCommandExecuteEvent(server, player, command, event) {
    Logger.log(`command executed by ${player.username}: ${command}`);
    switch (command.toLowerCase()) {
      case "/testcommand":
        // player.username returns the player's username
        // player.ip returns the player's ip without port
        // player.port returns the player's port
        // player.fullip returns player's ip and port
        // player.gamemode returns player's gamemode
        // player.offline checks if the player is online or not
        // player.op returns the player's op status
        // player.permlevel returns the player's permission level
        player.sendMessage(`Hi ${player.username}. Your IP is: ${player.ip}`); // This code sends message TO player
        player.sendMessage(Colors.red + "This message is red");
        player.chat(`This message was sent by example plugin`); // This code sends message AS A player
        player.setGamemode(GameMode.CREATIVE); // This updates the player gamemode. Valid gamemodes are: "creative", "survival", "adventure", "spectator" or "fallback"

        const Toast = new ToastManager();
        Toast.title = "Hello, world";
        Toast.message = "This is an example of a Toast";
        Toast.send(player);

        const form = new Form();
        // REMEMBER: FormTypes.FORM is supported, but is has very limited functionality. FormTypes.CUSTOMFORM is better
        form.type = FormTypes.CUSTOMFORM;
        form.title = "Title";
        form.id = 0;
        form.buttons = [{ text: "Button" }];
        form.addInput("Hello, world", "Placeholder");
        //            ^ text          ^ placeholder
        form.addText("text");
        form.addDropdown("dropdown", [{ text: "Option 1" }]);
        //               ^ dropdown  ^ options (null to disable)
        form.addToggle("Toggle");
        form.addSlider("slider", 0, 100, 50);
        //             ^ text   ^min^max ^ step
        form.send(player);

        //              ^ title ^ toast description/body
        player.setTime(17000); // Updates the player time
        setTimeout(() => {
          if (!player.offline) {
            // Make sure to check if the player is still online after doing setTimeout() that uses player API in production plugins
            player.transfer("127.0.0.1", 19132); // Moves player to another server
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
      case "/kick":
        player.kick(Colors.red + "Kick demo");
        break;
    }
  },

  ServerConsoleCommandExecutedEvent(command, server, event) {
    Logger.log(`Console executed command: ${command}`);
    // This code executes when console executes a command
  },

  ServerInternalServerErrorEvent(server, player, error, event) {
    Logger.log(`Server error: ${error}`);
    // This code executes when there is an server error
  },

  PlayerMoveEvent(server, player, location, event) {
    Logger.log(`Player moved to ${location}`);
    // This code executes when player moves
  },

  PlayerGamemodeChangeEvent(server, player, gamemode, event) {
    Logger.log(`Gamemode changed to ${gamemode}`);
    // This code executes when player changes his own gamemode
  },

  ServerToClientChat(server, player, msg, event) {
    Logger.log(`Server to client message: ${msg}`);
    // This code executes when the server sends a chat message to player
  },

  ServerToastRequest(player, server, title, msg, event) {
    Logger.log(`Toast: ${title}:${msg}`);
    // This code executes when the server sends toast to player
  },

  PlayerTransferEvent(player, server, address, port, event) {
    Logger.log(`Player transfered to ${address}:${port}`);
    // This code executes when player transfers to another server
    // WARNING: Functions like player.sendMessage(), player.transfer() will not work anymore on that player
  },

  PlayerFormResponseEvent(server, player, packet, event) {
    Logger.log(`Form response from ${player.username}`);
    player.sendMessage("Response: " + JSON.stringify(packet).toString());
    // This code executes when:
    // a) Player clicks a button in a form
    // b) Player closes a form
    // c) Player inputs text into form
    // d) Player selects an option in a form
  },
};
