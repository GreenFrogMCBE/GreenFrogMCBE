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
const ConnectionHandler = require("./ConnectionHandler")

const { EventEmitter, Event } = require("@kotinash/better-events")

const { get_key } = require("../../../utils/Language")

const Logger = require("../../../utils/Logger")

const Frog = require("../../../Frog")

class ListeningHandler {
	/**
	 * @param {import("dgram").Socket} socket
	 * @param {import("Frog").QuerySettings} settings
	 */
	handle_listening(socket, settings) {
		// Get the query address
		const address = `/${Frog.config.network.host}:${Frog.config.query.port}`

		try {
			EventEmitter.emit(
				new Event(
					"queryListen",
					(() => {
						socket.bind(settings.port, settings.host)

						socket.on("message", (message, client) =>
							new ConnectionHandler()
								.handle_connection(socket, settings, message, client)
						)

						Logger.info(get_key("query.server.listening.success", [address]))
					})
				)
			)
		} catch (error) {
			EventEmitter.emit(
				new Event(
					"queryError",
					{
						socket,
						settings,
						error,
					}
				)
			)

			if (error.code === "ERRADDRINUSE") {
				return Logger.error(get_key("query.server.listening.failed", [address]))
			}

			Logger.error(get_key("query.server.error", [error.stack]))
		}
	}
}

module.exports = ListeningHandler
