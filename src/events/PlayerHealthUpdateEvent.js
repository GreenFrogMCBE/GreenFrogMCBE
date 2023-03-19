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
const SetHealth = require("../network/packets/ServerSetHealthPacket")
const Event = require("./Event");
const fs = require("fs");

class clientHealthUpdateEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "clientHealthUpdateEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	async execute(server, client, health) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../plugins/${plugin}`).clientHealthUpdateEvent(server, client, health);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
	
		if (!this.cancelled) {
			const sethealthpacket = new SetHealth()
			sethealthpacket.setHealth(health)
			sethealthpacket.send(client)
	
			client.setAttribute({
				"min": 0,
				"max": 20,
				"current": health,
				"default": 20,
				"name": "minecraft:health",
				"modifiers": []
			})
	
			client.health = health;
	
			if (client.health <= 0) {
				client.dead = true
			}
		}
	}
	
}

module.exports = clientHealthUpdateEvent;