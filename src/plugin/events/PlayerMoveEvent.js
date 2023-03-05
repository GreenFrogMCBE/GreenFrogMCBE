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
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const Event = require("./Event");
const fs = require("fs");

class PlayerMoveEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerMoveEvent";
	}

	cancel() {
		this.cancelled = true;
		//TODO
	}

	execute(server, client, location) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../../plugins/${plugin}`).onPlayerMove(client, server, location, this);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
		this.postExecute(client);
	}

	isCancelled() {
		return this.cancelled;
	}

	postExecute(client) {
		//TODO
	}
}

module.exports = PlayerMoveEvent;
