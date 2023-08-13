const rl = require("readline");
const fs = require("fs");

const ClientJoin = require("../test/ClientJoin");
const ClientMessage = require("../test/ClientSendMessage");
const ClientCommand = require("../test/ClientRunCommand");
const StartServer = require("../test/StartServer");
const TestConfigs = require("../test/TestConfigs");
const Query = require("../test/Query");

if (!fs.existsSync("config.yml")) {
	const defaultConfig = fs.readFileSync("../src/resources/defaultConfig.yml");
	fs.writeFileSync("config.yml", defaultConfig);
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
			runTest(1, "Start server", joinTest);
			break;
		case "2":
			runTest(2, "Start server and send message", messageTest);
			break;
		case "3":
			runTest(3, "Start server and try to execute a command", commandTest);
			break;
		case "4":
			runTest(4, "Test the configurations for JSON errors", configTest);
			break;
		case "5":
			runTest(5, "Test if the query server works", queryTest);
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
 * @param {number} testNumber 
 * @param {string} testName 
 * @param {function} testFunction 
 */
function runTest(testNumber, testName, testFunction) {
	console.info(`Starting test ${testNumber} (${testName})...`);
	StartServer.test();

	setTimeout(() => {
		try {
			testFunction();
		} catch (e) {
			console.error(`Tests failed! ${e.stack}`);
			process.exit(-1);
		}
	}, 6000);
}

function handleTestSuccess() {
	console.info("Tests passed!");
	process.exit(0);
}

function joinTest() {
	runTest(ClientJoin, "join");
}

function messageTest() {
	runTest(ClientMessage, "send message");
}

function commandTest() {
	runTest(ClientCommand, "execute command");
}

function configTest() {
	runTest(TestConfigs, "configurations");
}

function queryTest() {
	runTest(Query, "query server");
}

/**
 * Run a test
 * 
 * @param {import("Frog").Test} clientTest 
 * @param {string} testName 
 */
function runTest(clientTest, testName) {
	setTimeout(() => {
		try {
			clientTest.test();
		} catch (e) {
			console.error(`Tests failed! Failed to run test "${testName}"! ${e.stack}`);
			process.exit(-1);
		} finally {
			setTimeout(handleTestSuccess, 10000);
		}
	}, 3000);
}