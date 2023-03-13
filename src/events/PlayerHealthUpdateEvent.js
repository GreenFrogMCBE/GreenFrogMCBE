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
const SetHealth = require("../network/packets/SetHealth")
const Event = require("./Event");
const fs = require("fs");

class PlayerHealthUpdateEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerHealthUpdateEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	execute(server, client, health) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../../plugins/${plugin}`).PlayerHealthUpdateEvent(server, client, health);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
		this.postExecute(client, health);
	}

	isCancelled() {
		return this.cancelled;
	}

	postExecute(player, health) {
		if (!this.isCancelled()) {
			const sethealthpacket = new SetHealth()
			sethealthpacket.setHealth(health)
			sethealthpacket.send(player)

			player.setAttribute({
				"min": 0,
				"max": 20,
				"current": health,
				"default": 20,
				"name": "minecraft:health",
				"modifiers": []
			})

			player.health = health;
			
			if (player.health <= 0) {
				player.dead = true
			}
		}
	}
}

module.exports = PlayerHealthUpdateEvent;