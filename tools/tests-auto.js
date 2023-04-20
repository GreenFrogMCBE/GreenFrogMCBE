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
const fs = require("fs");

if (!fs.existsSync("../config.yml")) {
	const config = fs.readFileSync('../src/internalResources/defaultConfig.yml')

	fs.writeFileSync('../config.yml', config, () => { })
}

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
