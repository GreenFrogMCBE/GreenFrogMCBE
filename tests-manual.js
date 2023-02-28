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

// Credit: AnyBananaGAME

const rl = require("readline");
const ClientJoin = require("./test/ClientJoin");
const ClientMessage = require("./test/ClientSendMessage");
const ClientCommand = require("./test/ClientRunCommand");
const StartServer = require("./test/StartServer");
const TestConfigs = require("./test/TestConfigs");

const fs = require("fs");
if (!fs.existsSync("config.yml")) {
  fs.writeFileSync(
    "config.yml",
    `# LISTENING
# 
# This section contains the config for server host and port
host: '0.0.0.0'
port: 19132
# SERVER INFO
#
# This section contains motd, and other server info settings
motd: '§aDedicated GreenFrog server'
maxPlayers: 20
version: '1.19.63'
offlineMode: true
lang: 'en_US' # Valid languages are en_US, fr_FR, lt_LT, uk_UA, vi_VN
# CHAT
#
# This section contains some chat settings
disable: false
commandsDisabled: false # (will only disabled them for players, not console)
blockInvalidMessages: true # Kicks the player if the player tried to send an too long or empty message and also prevents from using colors in chat
# DEVELOPMENT SETTINGS
# 
# This section contains settings like debug, exit codes, etc
unstable: false # Makes your server not crash on critical errors
debug: false # Debug mode
crashCode: -1
exitCode: 0
logUnhandledPackets: false
defaultPermissionLevel: 2
# Permission levels are: 
# 4 - operator
# 3 - unknown
# 2 - member
# 1 - unknown
# 0 - visitor
multiProtocol: false # Supports 1.19.20+. Some features may be broken
# WORLD SETTINGS
#
# This section contains world settings
renderChunks: true
gamemode: "creative" # Valid gamemodes are "creative", "survival", "spectator", "adventure" and "fallback"
worldGamemode: "creative" # Valid gamemodes are "creative", "survival", "spectator", "adventure" and "fallback"
difficulty: 0 # Currently only visual
# Command settings
# 
# Allows to disable/enable commands
# Make sure that "commandsDisabled" in chat section is enabled
consoleCommandKick: true
consoleCommandVer: true
consoleCommandShutdown: true
consoleCommandVersion: true
consoleCommandTime: true
consoleCommandPl: true
consoleCommandPlugins: true
consoleCommandStop: true # Will only stop showing in /help, if disabled
consoleCommandSay: true
consoleCommandOp: true
consoleCommandDeop: true
consoleCommandHelp: true
consoleCommandList: true
consoleCommandMe: true
playerCommandVersion: true
playerCommandPlugins: true
playerCommandStop: true
playerCommandSay: true
playerCommandOp: true
playerCommandKick: true
playerCommandTime: true
playerCommandDeop: true
playerCommandList: true
playerCommandMe: true`
  )
}

console.log("Starting testing...");

const ServerInfo = require("./src/server/ServerInfo");
const config = ServerInfo.config;

if (!config.offlineMode) {
  console.log(
    "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" +
    "\u001b[38;5;203m\u001b[6mYou can not use tests in \u001b[38;5;87mOfflineMode\u001b[38;5;203m set to \u001b[38;5;87mfalse \u001b[0m" +
    "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
  );
  return process.exit(0);
}
const r = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log(
  "Welcome to GreenFrogMCBE Tests!\n\n[1] = Join server (Test)\n[2] = Join the server and send a message (Test)\n[3] = Join the server and try to send a command request (Test)"
);

r.question("> ", (response) => {
  const args = response.split(/ +/);
  let tests = ["3", "2", "1"];

  if (args[0] == "1") {
    StartServer.test();
    console.log(
      "\u001b[1m\u001b[38;5;214mStarting test 1 (Join server)...\u001b[0m"
    );
    r.close();
    joinTest();
  }
  if (args[0] == "2") {
    StartServer.test();
    r.close();
    console.log(
      "\u001b[1m\u001b[38;5;214mStarting test 2 (Join server and send Messages)...\u001b[0m"
    );
    messageTest()
  }
  if (args[0] == "3") {
    StartServer.test();

    r.close();
    console.log(
      "\u001b[1m\u001b[38;5;214mStarting test 2 (Join server and try to execute a command)...\u001b[0m"
    );
    commandTest()
  }

  if (!tests.includes(args[0])) {
    console.log(`Could not find test ${args[0]}`);
    r.close();
    process.exit();
  }
});

let joinTest = () =>
  setTimeout(() => {
    try {
      TestConfigs.test();
    } catch (e) {
      console.log("Tests failed! Failed to test the configs! " + e.stack);
      process.exit(-1);
    } finally {
      setTimeout(() => {
        try {
          ClientJoin.test();
        } catch (e) {
          console.log("Tests failed! Failed to join with client! " + e.stack);
          process.exit(-1);
        } finally {
          setTimeout(() => {
            console.log("Tests passed!");
            process.exit(0);
          }, 10000);
        }
      }, 3000);
    }
  }, 6000);
let messageTest = () =>
  setTimeout(() => {
    try {
      TestConfigs.test();
    } catch (e) {
      console.log("Tests failed! Failed to test the configs! " + e.stack);
      process.exit(-1);
    } finally {
      setTimeout(() => {
        try {
          ClientMessage.test();
        } catch (e) {
          console.log("Tests failed! Failed to join with client! " + e.stack);
          process.exit(-1);
        } finally {
          setTimeout(() => {
            console.log("Tests passed!");
            process.exit(0);
          }, 10000);
        }
      }, 3000);
    }
  }, 6000);
let commandTest = () =>
  setTimeout(() => {
    try {
      TestConfigs.test();
    } catch (e) {
      console.log("Tests failed! Failed to test the configs! " + e.stack);
      process.exit(-1);
    } finally {
      setTimeout(() => {
        try {
          ClientCommand.test();
        } catch (e) {
          console.log("Tests failed! Failed to join with client! " + e.stack);
          process.exit(-1);
        } finally {
          setTimeout(() => {
            console.log("Tests passed!");
            process.exit(0);
          }, 10000);
        }
      }, 3000);
    }
  }, 6000);