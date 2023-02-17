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
const ClientJoin = require("./test/ClientJoin");
const StartServer = require("./test/StartServer");
const TestConfigs = require("./test/TestConfigs");

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
        console.log("Tests passed!");
        process.exit(0);
      }
    }, 5000);    
  }
}, 3500);
