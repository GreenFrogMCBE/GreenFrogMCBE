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
const ClientRunCommand = require("../test/ClientRunCommand");
const ClientSendMessage = require("../test/ClientSendMessage");
const ClientJoin = require("../test/ClientJoin");
const StartServer = require("../test/StartServer");
const TestConfigs = require("../test/TestConfigs");
const Query = require("../test/Query");

try {
	StartServer.test();
} catch (e) {
	handleTestFailure("Failed to start the server!", e);
}

setTimeout(() => {
	try {
		TestConfigs.test();
	} catch (e) {
		handleTestFailure("Failed to test the.!", e);
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

				setTimeout(() => {
					try {
						Query.test();

						console.info("All tests passed!");
						process.exit(0);
					} catch (e) {
						handleTestFailure("Failed to contact the server using query!", e);
					}
				}, 8000);
			}, 8000);
		}, 8000);
	}, 10000);
}, 3500);

/**
 * 
 * @param { string } errorMessage 
 * @param { Error }  error 
 */
function handleTestFailure(errorMessage, error) {
	console.info("Tests failed! " + errorMessage + " " + error.stack);
	process.exit(-1);
}
