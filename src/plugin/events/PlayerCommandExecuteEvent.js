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
const Event = require("./Event");
const Logger = require("../../server/Logger");
const { config, lang } = require("../../server/ServerInfo");
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");

const fs = require("fs");

class PlayerCommandExecuteEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerCommandExecuteEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	execute(server, client, command) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../../plugins/${plugin}`).PlayerCommandExecuteEvent(server, client, command, this);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
		this.postExecute(client, command);
	}

	isCancelled() {
		return this.cancelled;
	}

	postExecute(client, message) {
		// TODO: Adding Command Support
	}
}

module.exports = PlayerCommandExecuteEvent;
