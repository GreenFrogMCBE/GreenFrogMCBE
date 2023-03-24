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


class PlayerHealthUpdateEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerHealthUpdateEvent";
		this.player = null
		this.server = null
		this.health = 0
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute()

		if (!this.cancelled) {
			const setHealthPacket = new SetHealth();
			setHealthPacket.setHealth(this.health);
			setHealthPacket.writePacket(this.player);

			this.player.setAttribute({
				name: 'minecraft:health',
				min: 0,
				max: 20,
				current: this.health,
				default: 20,
				modifiers: []
			});

			this.player.health = this.health;

			if (this.player.health <= 0) {
				this.player.dead = true;
			}
		}
	}
}

module.exports = PlayerHealthUpdateEvent;