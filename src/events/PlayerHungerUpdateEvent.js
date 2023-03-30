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

const HungerCause = require("./types/HungerCause");

class PlayerHungerUpdateEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerHungerUpdateEvent";
		this.player = null;
		this.server = null;
		this.hunger = null;
		this.maxHunger = null;
		this.minHunger = null;
		this.defaultHunger = null;
		this.modifiers = [];
		this.attributeName = null;
		this.cause = HungerCause.UNKNOWN;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			this.player.setAttribute({
				name: this.attributeName,
				min: this.minHunger,
				max: this.maxHunger,
				current: this.hunger,
				default: this.defaultHunger,
				modifiers: this.modifiers,
			});

			this.player.hunger = this.hunger;
		}
	}
}

module.exports = PlayerHungerUpdateEvent;
