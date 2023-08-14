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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const rl = require("readline");
const fs = require("fs");

const ClientJoin = require("../test/ClientJoin");
const ClientSendMessage = require("../test/ClientSendMessage");
const ClientRunCommand = require("../test/ClientRunCommand");
const TestConfigs = require("../test/TestConfigs");
const Query = require("../test/Query");

if (!fs.existsSync("config.yml")) {
	fs.writeFileSync("config.yml", fs.readFileSync("../src/resources/defaultConfig.yml"));
}

console.info("Starting testing...");

const r = rl.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.info("Welcome to GreenFrogMCBE tests!\n");
console.info("[1] = Start server");
console.info("[2] = Start the server and send a message");
console.info("[3] = Start the server and try to send a command request");
console.info("[4] = Test the configuration files for JSON errors");
console.info("[5] = Test the query server");

r.question("> ", (response) => {
	const args = response.split(/ +/);

	switch (args[0]) {
		case "1":
			runTest("Start server", ClientJoin);
			break;
		case "2":
			runTest("Start server and send message", ClientSendMessage);
			break;
		case "3":
			runTest("Start server and try to execute a command", ClientRunCommand);
			break;
		case "4":
			runTest("Test the configurations for JSON errors", TestConfigs);
			break;
		case "5":
			runTest("Test if the query server works", Query);
			break;
		default:
			console.error(`Could not find test ${args[0]}`);
			break;
	}

	r.close();
});

/**
 * Runs a test
 * 
 * @param {string} testName 
 * @param {import("Frog").Test} test
 */
function runTest(testName, test) {
	setTimeout(() => {
		try {
			test.test();
		} catch (error) {
			console.error(`Tests failed! Failed to run test "${testName}"! ${error.stack}`);
			process.exit(-1);
		} finally {
			setTimeout(handleTestSuccess, 10000);
		}
	}, 3000);
}

function handleTestSuccess() {
	console.info("Tests passed!");
	process.exit(0);
}
