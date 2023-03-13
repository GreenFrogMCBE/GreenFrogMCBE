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
const ToastRequest = require("../../network/packets/ToastRequest");
const Event = require("./Event");
const fs = require("fs");

class ServerToastRequestEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "ServerToastRequestEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	async execute(server, client, title, message) {
		await new Promise((resolve) => {
			fs.readdir("./plugins", (err, plugins) => {
				plugins.forEach((plugin) => {
					try {
						require(`${__dirname}/../../../plugins/${plugin}`).ServerToastRequestEvent(server, client, title, message, this);
					} catch (e) {
						FailedToHandleEvent.handleEventError(e, plugin, this.name);
					}
				});
				resolve();
			});
		});

		if (!this.cancelled) {
			let packet = new ToastRequest();
			packet.setTitle(title);
			packet.setMessage(message);
			packet.send(client);
		}
	}
}

module.exports = ServerToastRequestEvent;
