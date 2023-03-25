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
const ServerContainerOpenPacket = require("../network/packets/ServerContainerOpenPacket");

const Event = require("./Event");

class PlayerContainerOpenEvent extends Event {
	constructor() {
		super();
		this.name = "PlayerContainerOpenEvent";
		this.server = null;
		this.player = null;
		this.windowID = null;
		this.windowType = null;
		this.runtimeId = null;
		this.cancelled = false;
		this.coordinateX = 0;
		this.coordinateY = 0;
		this.coordinateZ = 0;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			const containeropen = new ServerContainerOpenPacket();
			containeropen.setWindowID(this.windowID);
			containeropen.setWindowType(this.windowType);
			containeropen.setRuntimeEntityId(this.runtimeId);
			containeropen.setCoordinates(this.coordinateX, this.coordinateY, this.coordinateZ);
			containeropen.writePacket(this.player);
		}
	}
}

module.exports = PlayerContainerOpenEvent;
