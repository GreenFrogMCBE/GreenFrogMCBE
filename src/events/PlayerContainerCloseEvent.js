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

const ServerContainerClosePacket = require("../network/packets/ServerContainerClosePacket");

const WindowID = require("../network/packets/types/WindowID");

const Event = require("./Event");

class PlayerContainerCloseEvent extends Event {
	constructor() {
		super();
		this.name = "PlayerContainerCloseEvent";
		this.server = null;
		this.player = null;
		this.isRequestByServer = false; // TODO: Should be true
		this.windowID = WindowID.CREATIVE;
		this.cancelled = false;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			const containerclose = new ServerContainerClosePacket();
			containerclose.setServer(this.isRequestByServer);
			containerclose.setWindowID(this.windowID);
			containerclose.writePacket(this.player);
		}
	}
}

module.exports = PlayerContainerCloseEvent;
