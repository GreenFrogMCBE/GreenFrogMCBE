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
const ConnectionHandler = require("./ConnectionHandler");

const { getKey } = require("../../../utils/Language");

const Logger = require("../../../utils/Logger");

const Frog = require("../../../Frog");

class ListeningHandler {
	/**
	 * @param {import("dgram").Socket} socket
	 * @param {import("Frog").QuerySettings} settings
	 */
	handleListening(socket, settings) {
		// Get the query address
		const address = `/${Frog.config.network.host}:${Frog.config.query.port}`;

		// Try to bind the socket
		try {
			let shouldListen = true;

			Frog.eventEmitter.emit("queryListen", {
				socket,
				querySettings: settings,
				cancel: () => {
					shouldListen = false;
				},
			});

			if (!shouldListen) return;

			socket.bind(settings.port, settings.host);

			// Start handling connections
			socket.on("message", (message, client) => new ConnectionHandler().handleConnection(socket, settings, message, client));

			Logger.info(getKey("query.server.listening.success").replace("%s", address));
		} catch (error) {
			// Emit the queryError event
			let shouldCancelError = false;

			Frog.eventEmitter.emit("queryError", {
				socket,
				querySettings: settings,
				error,
				cancel: () => {
					shouldCancelError = true;
				},
			});

			if (!shouldCancelError) return;

			// Check if the error code is ERRADDRINUSE (usually caused by another server listening on the same port)
			if (error.code === "ERRADDRINUSE") {
				Logger.error(getKey("query.server.listening.failed").replace("%s", address));
				return;
			}

			Logger.error(getKey("query.server.error").replace("%s", error.stack));
		}
	}
}

module.exports = ListeningHandler;
