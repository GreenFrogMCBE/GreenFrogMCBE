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
const SetHealth = require("../network/packets/ServerSetHealthPacket")


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
		await this._execute()
	
		if (!this.cancelled) {
			const sethealthpacket = new SetHealth()
			sethealthpacket.setHealth(health)
			sethealthpacket.writePacket(client)
	
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