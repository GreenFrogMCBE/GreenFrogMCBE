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
const Text = require("../../network/packets/Text");
const Event = require("./Event");
const fs = require("fs");

class ServerToClientChat extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "ServerToClientChat";
	}

	cancel() {
		this.cancelled = true;
	}

	execute(server, client, message) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../../plugins/${plugin}`).ServerToClientChat(
						server,
						client,
						message,
						this
					);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
		this.postExecute(client, message);
	}

	isCancelled() {
		return this.cancelled;
	}

	postExecute(client, message) {
		if (!this.isCancelled()) {
			const text = new Text();
			text.setMessage(message);
			text.send(client);
		}
	}
}

module.exports = ServerToClientChat;
