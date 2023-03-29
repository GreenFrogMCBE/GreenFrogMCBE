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

const GameMode = require("../api/GameMode")

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
	 * NOTE: This can be spoofed by hacked clients	 (e.g Horion/Zephyr) 
	 */
	async calculateFalldamage() {
		if (this.player.gamemode == GameMode.CREATIVE || this.player.gamemode == GameMode.SPECTATOR) return;

		let falldamageY = this.player.y - this.position.y

		if (this.onGround && this.player.fallDamageQueue) {
			this.player.setHealth(this.player.health - this.player.fallDamageQueue)
			this.player.fallDamageQueue = 0
		}

		if (falldamageY < 0.4) { // If player moved up
			return;
		}

		this.player.sendMessage("Y" + falldamageY + 3)
		this.player.fallDamageQueue = falldamageY + 3
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			this.calculateFalldamage();

			this.player.x = this.position.x;
			this.player.y = this.position.y;
			this.player.z = this.position.z;
		}
	}
}

module.exports = PlayerMoveEvent;
