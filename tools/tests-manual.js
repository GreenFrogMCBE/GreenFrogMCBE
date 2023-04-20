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
const ClientJoin = require("../test/ClientJoin");
const ClientMessage = require("../test/ClientSendMessage");
const ClientCommand = require("../test/ClientRunCommand");
const StartServer = require("../test/StartServer");
const TestConfigs = require("../test/TestConfigs");
const fs = require("fs");

if (!fs.existsSync("../config.yml")) {
	const config = fs.readFileSync("../src/internalResources/defaultConfig.yml");

	fs.writeFileSync("../config.yml", config, () => {});
}

console.info("Starting testing...");

const ServerInfo = require("../src/api/ServerInfo");
const config = ServerInfo.config;

if (!config.offlineMode) {
	console.info("You can't use tests in online mode!");
	process.exit();
}

const r = rl.createInterface({
	input: process.stdin,
	output: process.stdout,
});
console.info("Welcome to GreenFrogMCBE Tests!\n\n[1] = Start server\n[2] = Start the server and send a message\n[3] = Start the server and try to send a command request");

r.question("> ", (response) => {
	const args = response.split(/ +/);
	let tests = ["3", "2", "1"];

	if (args[0] == "1") {
		StartServer.test();
		console.info("\u001b[1m\u001b[38;5;214mStarting test 1 (Start server)...\u001b[0m");
		r.close();
		joinTest();
	}
	if (args[0] == "2") {
		StartServer.test();
		r.close();
		console.info("\u001b[1m\u001b[38;5;214mStarting test 2 (Start server and send message)...\u001b[0m");
		messageTest();
	}
	if (args[0] == "3") {
		StartServer.test();

		r.close();
		console.info("\u001b[1m\u001b[38;5;214mStarting test 3 (Start server and try to execute a command)...\u001b[0m");
		commandTest();
	}

	if (!tests.includes(args[0])) {
		console.info(`Could not find test ${args[0]}`);
		r.close();
	}
});

let joinTest = () =>
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
						console.info("Tests passed!");
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
			console.info("Tests failed! Failed to test the configs! " + e.stack);
			process.exit(-1);
		} finally {
			setTimeout(() => {
				try {
					ClientMessage.test();
				} catch (e) {
					console.info("Tests failed! Failed to join with client! " + e.stack);
					process.exit(-1);
				} finally {
					setTimeout(() => {
						console.info("Tests passed!");
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
			console.info("Tests failed! Failed to parse the configs! " + e.stack);
			process.exit(-1);
		} finally {
			setTimeout(() => {
				try {
					ClientCommand.test();
				} catch (e) {
					console.info("Tests failed! Failed to join with client! " + e.stack);
					process.exit(-1);
				} finally {
					setTimeout(() => {
						console.info("Tests passed!");
						process.exit(0);
					}, 10000);
				}
			}, 3000);
		}
	}, 6000);
