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
/* This file starts the server */
const fs = require('fs')

try {
  if (!fs.existsSync('config.json')) {
    fs.writeFileSync('config.json', `{
  "host": "0.0.0.0",
  "port": 19132,
  "motd": "§6GreenFrogMCBE server",
  "maxplayers": 20,
  "version": "1.19.50",
  "offlinemode": false,
  "invalidmsgsblock": true,
  "unstable": false,
  "lang": "en_US",
  "debug": false,
  "crashstatuscode": -1,
  "exitstatuscode": 0,
  "logunhandledpackets": true,
  "gamemode": "creative",
  "world_gamemode": "creative",
  "default_permission_level": 2,
  "render_chunks": true
}`)
  }
  if (!fs.existsSync('commands.json')) {
    fs.writeFileSync('commands.json', `{
  "console_command_help": true,
  "console_command_kick": true,
  "console_command_version": true,
  "console_command_time": true,
  "console_command_pl": true,
  "console_command_say": true,
  "console_command_plugins": true,
  "console_command_op": true,
  "player_command_version": true,
  "player_command_plugins": true,
  "player_command_stop": true,
  "player_command_say": true,
  "player_command_op": true
}`)
  }
  const Frog = require("./src/Server.js");
  Frog.start();
} catch (e) {
  console.error("Failed to start the server");
  console.error("The error was: ");
  console.error(e.stack);
  console.error(
    `Make sure that you have the required libraries. Run npm i to install them`
  );
  console.error(
    "If you are sure that this is a bug please report it to our repo: https://github.com/andriycraft/GreenFrogMCBE"
  );
}

// Close server on nodemon restart
process.once("SIGINT", async () => {
  await require("./src/server/ShutdownAPI.js");
});
