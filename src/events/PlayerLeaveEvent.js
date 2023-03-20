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

class PlayerLeaveEvent extends Event {
	constructor() {
		super();
		this.name = "PlayerLeaveEvent";
	}

	cancel() {
		throw new UnsupportedOperationException("This event is impossible to cancel")
	}

	execute(server, client) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../plugins/${plugin}`).PlayerLeaveEvent(server, client, this);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
	}
}

module.exports = PlayerLeaveEvent;
