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
const Transfer = require("../network/packets/ServerTransferPacket");
const Event = require("./Event");

class PlayerTransferEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerTransferEvent";
		this.server = null;
		this.player = null;
		this.address = null;
		this.port = null;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		this._execute(this)();

		if (!this.cancelled) {
			const trpk = new Transfer();
			trpk.setServerAddress(this.address);
			trpk.setPort(this.port);
			trpk.send(this.player);
		}
	}
}

module.exports = PlayerTransferEvent;
