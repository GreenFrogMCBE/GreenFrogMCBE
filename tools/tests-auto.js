/**
* ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
* ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
* ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
* ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
* ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
* ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
*
* The content of this file is licensed using the CC-BY-4.0 license
* which requires you to agree to its terms if you wish to use or make any changes to it.
*
* @license CC-BY-4.0
* @link Github - https://github.com/andriycraft/GreenFrogMCBE
* @link Discord - https://discord.gg/UFqrnAbqjP
*/
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
const ClientRunCommand = require("../test/ClientRunCommand");
const ClientSendMessage = require("../test/ClientSendMessage");
const ClientJoin = require("../test/ClientJoin");
const StartServer = require("../test/StartServer");
const TestConfigs = require("../test/TestConfigs");

console.info("Starting testing...");

try {
	StartServer.test();
} catch (e) {
	console.info("Tests failed! Failed to start the server! " + e.stack);
	process.exit(-1);
}

setTimeout(() => {
	try {
		TestConfigs.test();
	} catch (e) {
		console.info("Tests failed! Failed to test the configs! " + e.stack);
		process.exit(-1);
	} finally {
		setTimeout(() => {
			try {
				ClientJoin.test();
			} catch (e) {
				console.info("Tests failed! Failed to join with client! " + e.stack);
				process.exit(-1);
			} finally {
				setTimeout(() => {
					try {
						ClientRunCommand.test();
					} catch (e) {
						console.info("Tests failed! Failed to run command: /pl! " + e.stack);
						process.exit(-1);
					} finally {
						setTimeout(() => {
							setTimeout(() => {
								try {
									ClientSendMessage.test();
								} catch (e) {
									console.info("Tests failed! Failed to send a chat message! " + e.stack);
									process.exit(-1);
								} finally {
									setTimeout(() => {
										console.info("Tests passed");
										process.exit(0);
									}, 10000);
								}
							}, 3000);
						}, 10000);
					}
				}, 10000);
			}
		}, 10000);
	}
}, 3500);
