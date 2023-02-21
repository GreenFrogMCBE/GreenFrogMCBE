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
// super ugly code
const ClientJoin = require("./test/ClientJoin");
const StartServer = require("./test/StartServer");
const TestConfigs = require("./test/TestConfigs");
const ServerInfo = require("./src/server/ServerInfo")
const config = ServerInfo.config;


if(!config.offlineMode){
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n"
  +
  '\u001b[38;5;203m\u001b[6mYou can not use tests in \u001b[38;5;87mOfflineMode\u001b[38;5;203m set to \u001b[38;5;87mfalse \u001b[0m'
  +
  "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  process.exit(0)

}

console.log("Starting testing...");

try {
  StartServer.test();
} catch (e) {
  console.log("Tests failed! Failed to start the server! " + e.stack);
  process.exit(-1);
}

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
}, 3500);
