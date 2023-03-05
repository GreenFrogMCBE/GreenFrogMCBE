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
const Transfer = require("../../network/packets/Transfer");

class PlayerTransferEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerTransferEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	execute(server, client, address, port) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../../plugins/${plugin}`).PlayerTransferEvent(
						server,
						client,
						address,
						port,
						this
					);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
		this.postExecute(client, address, port);
	}

	isCancelled() {
		return this.cancelled;
	}

	postExecute(client, address, port) {
		if (!this.isCancelled()) {
			const trpk = new Transfer();
			trpk.setServerAddress(address);
			trpk.setPort(port);
			trpk.send(client);
		}
	}
}

module.exports = PlayerTransferEvent;
