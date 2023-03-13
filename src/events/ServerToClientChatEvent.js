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
const Text = require("../network/packets/Text");
const Event = require("./Event");
const fs = require("fs");

class ServerToClientChatEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "ServerToClientChatEvent";
	}

	cancel() {
		this.cancelled = true;
	}
	async execute(server, client, message) {
		await new Promise((resolve) => {
			fs.readdir("./plugins", (err, plugins) => {
				plugins.forEach((plugin) => {
					try {
						require(`${__dirname}/../../plugins/${plugin}`).ServerToClientChatEvent(server, client, message, this);
					} catch (e) {
						FailedToHandleEvent.handleEventError(e, plugin, this.name);
					}
				});
				resolve();
			});
		});

		if (!this.cancelled) {
			const text = new Text();
			text.setMessage(message);
			text.send(client);
		}
	}
}

module.exports = ServerToClientChatEvent;
