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
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const UnsupportedOperationException = require("./exceptions/UnsupportedOperationException");

const fs = require("fs");

class Event {
	cancel() {
		throw new UnsupportedOperationException("This event is impossible to cancel");
	}

	execute() {
		throw new UnsupportedOperationException("Not implemented");
	}

	async _execute(event) {
		await new Promise((resolve, reject) => {
			fs.readdir("./plugins", (err, plugins) => {
				if (err) {
					reject(err);
				} else {
					plugins.forEach((plugin) => {
						if (plugin.includes(".js")) {
							try {
								require(`${__dirname}/../../plugins/${plugin}`)[event.name](event);
							} catch (e) {
								FailedToHandleEvent.handleEventError(e, plugin, event.name);
							}
						}
					});
					resolve();
				}
			});
		});
	}
}

module.exports = Event;
