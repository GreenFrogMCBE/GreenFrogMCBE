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
const Difficulty = require("../network/packets/ServerSetDifficultyPacket");
const Event = require("./Event");
const fs = require("fs");

class PlayerUpdateDifficultyEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerUpdateDifficultyEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	async execute(server, client, difficulty) {
		await new Promise((resolve, reject) => {
			fs.readdir("./plugins", (err, plugins) => {
				if (err) {
					reject(err);
				} else {
					plugins.forEach((plugin) => {
						try {
							require(`${__dirname}/../../plugins/${plugin}`).PlayerUpdateDifficultyEvent(server, client, difficulty);
						} catch (e) {
							FailedToHandleEvent.handleEventError(e, plugin, this.name);
						}
					});
					resolve();
				}
			});
		});

		if (!this.cancelled) {
			const difficultypacket = new Difficulty();
			difficultypacket.setDifficulty(difficulty)
			difficultypacket.writePacket(client)
		}
	}
}

module.exports = PlayerUpdateDifficultyEvent;
