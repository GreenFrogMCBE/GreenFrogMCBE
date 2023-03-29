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
const Event = require("./Event");

const SetHealth = require("../network/packets/ServerSetHealthPacket");

const PlayerDeathEvent = require("./PlayerDeathEvent");
const DamageCause = require("./types/DamageCause");

class PlayerHealthUpdateEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerHealthUpdateEvent";
		this.player = null;
		this.server = null;
		this.health = null;
		this.maxHealth = null;
		this.minHealth = null;
		this.modifiers = [];
		this.attributeName = null;
		this.cause = DamageCause.UNKNOWN;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			const setHealthPacket = new SetHealth();
			setHealthPacket.setHealth(this.health);
			setHealthPacket.writePacket(this.player);

			this.player.setAttribute({
				name: this.attributeName,
				min: this.minHealth,
				max: this.maxHealth,
				current: this.health,
				default: this.maxHealth,
				modifiers: this.modifiers,
			});

			this.player.health = this.health;

			if (this.player.health <= 0) {
				const playerDeathEvent = new PlayerDeathEvent();
				playerDeathEvent.player = this.player
				playerDeathEvent.server = this.server
				playerDeathEvent.execute();
			}
		}
	}
}

module.exports = PlayerHealthUpdateEvent;
