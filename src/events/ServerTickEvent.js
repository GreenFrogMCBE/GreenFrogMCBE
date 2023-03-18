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
/* eslint-disable no-unused-vars */
const UnsupportedOperationException = require("./exceptions/UnsupportedOperationException");
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const Event = require("./Event");
const fs = require("fs");

class ServerTickEvent extends Event {
	constructor() {
		super();
		this.name = "ServerTickEvent";
	}

	cancel() {
		throw new UnsupportedOperationException("This event is impossible to cancel")
    }

	async execute(server, world) {
		await new Promise((resolve) => {
			fs.readdir("./plugins", (err, plugins) => {
				plugins.forEach((plugin) => {
					try {
						require(`${__dirname}/../../../plugins/${plugin}`).ServerTickEvent(server, world);
					} catch (e) {
						FailedToHandleEvent.handleEventError(e, plugin, this.name);
					}
				});
				resolve();
			});
		});
	}
}

module.exports = ServerTickEvent;