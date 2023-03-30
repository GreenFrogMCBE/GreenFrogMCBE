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
const Event = require("./Event");

const GameMode = require("../api/GameMode");
const DamageCause = require("./types/DamageCause");

class PlayerMoveEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerMoveEvent";
		/** * Player coordinates */
		this.position = null;
		this.server = null;
		this.player = null;
		/** @deprecated Can be spoofed by hacked clients */
		this.onGround = false;
		this.mode = null;
	}

	/**
	 * Calculates fall damage
	 * NOTE: This can be spoofed by hacked client (e.g Horion/Zephyr) 
	 */
	async calculateFalldamage() {
		if (this.player.gamemode == GameMode.CREATIVE || this.player.gamemode == GameMode.SPECTATOR) return;

		let falldamageY = this.player.y - this.position.y

		if (this.onGround && this.player.fallDamageQueue && !this.player.___dmgCd) {
			this.player.setHealth(this.player.health - this.player.fallDamageQueue, DamageCause.FALL_DAMAGE)
			this.player.fallDamageQueue = 0
		}

		if (falldamageY < 0.676 || this.player.health <= 0) { // If player moved up
			return;
		}

		let modifier = 0

		if (falldamageY < 2) {
			modifier = 6
		} else if (falldamageY < 1) {
			modifier = 3
		} else if (falldamageY < 0.7) {
			modifier = 0.5
		} else {
			modifier = 0.25
		}

		this.player.fallDamageQueue = falldamageY + modifier

		this.player.___dmgCd = true
		setTimeout(() => {
			this.player.___dmgCd = false
		}, 500)
	}

	/**
	 * This function calculates how much hunger the player must lose
	 */
	async calculateHungerloss() {
		if (this.player.gamemode == GameMode.CREATIVE || this.player.gamemode == GameMode.SPECTATOR || this.player.hunger <= 0) return;

		if (Math.floor(Math.random() * 50) > 48) { // TODO: Vanilla behaviour
			this.player.setHunger(this.player.hunger - 1)
		}
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			await this.calculateFalldamage();
			await this.calculateHungerloss();

			this.player.x = this.position.x;
			this.player.y = this.position.y;
			this.player.z = this.position.z;
		}
	}
}

module.exports = PlayerMoveEvent;
