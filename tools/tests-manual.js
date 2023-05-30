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
/* eslint-disable no-empty */
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

	fs.writeFileSync("../config.yml", config, () => { });
}

console.info("Starting testing...");

try {
	const { serverConfigurationFiles } = require("../src/Frog");

	if (!serverConfigurationFiles.offlineMode) {
		console.info("You can't use tests in online mode!");
		process.exit();
	}
} catch { }

const r = rl.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.info("Welcome to GreenFrogMCBE Tests!\n\n[1] = Start server\n[2] = Start the server and send a message\n[3] = Start the server and try to send a command request");

r.question("> ", (response) => {
	const args = response.split(/ +/);

	switch (args[0]) {
		case "1":
			runTest(1, "Start server", joinTest);
			break;
		case "2":
			runTest(2, "Start server and send message", messageTest);
			break;
		case "3":
			runTest(3, "Start server and try to execute a command", commandTest);
			break;
		default:
			console.info(`Could not find test ${args[0]}`);
			break;
	}

	r.close();
});

function runTest(testNumber, testName, testFunction) {
	console.info(`\u001b[1m\u001b[38;5;214mStarting test ${testNumber} (${testName})...\u001b[0m`);

	StartServer.test();

	setTimeout(() => {
		try {
			TestConfigs.test();
			testFunction();
		} catch (e) {
			console.info(`Tests failed! ${e.stack}`);
			process.exit(-1);
		}
	}, 6000);
}

function handleTestSuccess() {
	console.info("Tests passed!");
	process.exit(0);
}

function joinTest() {
	setTimeout(() => {
		try {
			ClientJoin.test();
		} catch (e) {
			console.info("Tests failed! Failed to join with client! " + e.stack);
			process.exit(-1);
		} finally {
			setTimeout(handleTestSuccess, 10000);
		}
	}, 3000);
}

function messageTest() {
	setTimeout(() => {
		try {
			ClientMessage.test();
		} catch (e) {
			console.info("Tests failed! Failed to join with client! " + e.stack);
			process.exit(-1);
		} finally {
			setTimeout(handleTestSuccess, 10000);
		}
	}, 3000);
}

function commandTest() {
	setTimeout(() => {
		try {
			ClientCommand.test();
		} catch (e) {
			console.info("Tests failed! Failed to join with client! " + e.stack);
			process.exit(-1);
		} finally {
			setTimeout(handleTestSuccess, 10000);
		}
	}, 3000);
}