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
const ClientRunCommand = require("../test/ClientRunCommand");
const ClientSendMessage = require("../test/ClientSendMessage");
const ClientJoin = require("../test/ClientJoin");
const StartServer = require("../test/StartServer");
const TestConfigs = require("../test/TestConfigs");

try {
	StartServer.test();
} catch (e) {
	handleTestFailure("Failed to start the server!", e);
}

setTimeout(() => {
	try {
		TestConfigs.test();
	} catch (e) {
		handleTestFailure("Failed to test the configs!", e);
	}

	setTimeout(() => {
		try {
			ClientJoin.test();
		} catch (e) {
			handleTestFailure("Failed to join with client!", e);
		}

		setTimeout(() => {
			try {
				ClientRunCommand.test();
			} catch (e) {
				handleTestFailure("Failed to run command: /pl!", e);
			}

			setTimeout(() => {
				try {
					ClientSendMessage.test();
				} catch (e) {
					handleTestFailure("Failed to send a chat message!", e);
				}

				console.info("All tests passed!");
				process.exit(0);
			}, 10000);
		}, 10000);
	}, 10000);
}, 3500);

function handleTestFailure(errorMessage, error) {
	console.info("Tests failed! " + errorMessage + " " + error.stack);
	process.exit(-1);
}
