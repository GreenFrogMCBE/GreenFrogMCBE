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
const Transfer = require("../network/packets/ServerTransferPacket");
const Event = require("./Event");
const fs = require("fs");

class PlayerTransferEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerTransferEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	async execute(server, client, address, port) {
		await new Promise((resolve, reject) => {
			fs.readdir("./plugins", (err, plugins) => {
				if (err) {
					reject(err);
				} else {
					plugins.forEach((plugin) => {
						try {
							require(`${__dirname}/../../plugins/${plugin}`).PlayerTransferEvent(server, client, address, port, this);
						} catch (e) {
							FailedToHandleEvent.handleEventError(e, plugin, this.name);
						}
					});
					resolve();
				}
			});
		});

		if (!this.cancelled) {
			const trpk = new Transfer();
			trpk.setServerAddress(address);
			trpk.setPort(port);
			trpk.send(client);
		}
	}
}

module.exports = PlayerTransferEvent;
