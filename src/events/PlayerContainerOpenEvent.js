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
const ServerContainerClosePacket = require("../network/packets/ServerContainerClosePacket")
const WindowID = require("../network/packets/types/WindowID")

const Event = require("./Event");

class PlayerContainerOpenEvent extends Event {
	constructor() {
		super();
		this.name = "PlayerContainerOpenEvent";
		this.server = null
		this.player = null
		this.windowID = WindowID.CREATIVE
		this.cancelled = false
	}

	cancel() {
		const containerclose = new ServerContainerClosePacket()
		containerclose.setServer(false)
		containerclose.setWindowID(WindowID.CREATIVE)
		containerclose.writePacket(this.player)
	}

	async execute() {
		await this._execute(this)
	}
}

module.exports = PlayerContainerOpenEvent;