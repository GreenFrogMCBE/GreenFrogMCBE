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

class PlayerKickEvent extends Event {
	constructor() {
		super();
		this.name = "PlayerKickEvent";
		this.cancelled = false
	}

	cancel() {
		throw new UnsupportedOperationException("Cancelling this event is not supported")
	}

	execute(server, client, msg) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../plugins/${plugin}`).PlayerKickEvent(server, client, msg, this);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
	}
}

module.exports = PlayerKickEvent;
