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

class PlayerGamemodeChangeEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerGamemodeChangeEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	async execute(server, client, gamemode) {
		return new Promise((resolve, reject) => {
			fs.readdir("./plugins", (err, plugins) => {
				if (err) {
					reject(err);
					return;
				}
				const promises = plugins.map((plugin) => {
					return new Promise((resolve) => {
						try {
							require(`${__dirname}/../../plugins/${plugin}`).PlayerGamemodeChangeEvent(server, client, gamemode, this);
							resolve();
						} catch (e) {
							FailedToHandleEvent.handleEventError(e, plugin, this.name);
							resolve();
						}
					});
				});
				Promise.all(promises).then(() => {
					if (!this.cancelled) {
						client.oldgamemode = gamemode;
					} else {
						client.setGamemode(client.oldgamemode);
					}
					resolve();
				});
			});
		});
	}
}

module.exports = PlayerGamemodeChangeEvent;
