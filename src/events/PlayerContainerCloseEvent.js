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

const InventoryType = require("../network/packets/types/InventoryType");
const WindowID = require("../network/packets/types/WindowID");

const ContainerOpenPacket = require("../network/packets/ServerContainerOpenPacket")

const Event = require("./Event");

class PlayerContainerCloseEvent extends Event {
	constructor() {
		super();
		this.name = "PlayerContainerCloseEvent";
		this.server = null
		this.player = null
		this.coordinates = 0, 0, 0
		this.runtimeEntityId = 2
		this.windowType = InventoryType.INVENTORY
		this.windowID = WindowID.CREATIVE
		this.cancelled = false
	}

	cancel() {
		const containeropen = new ContainerOpenPacket()
		containeropen.setWindowID(WindowID.CREATIVE)
		containeropen.setWindowType(InventoryType.INVENTORY)
		containeropen.setRuntimeEntityId(2)
		containeropen.setCoordinates(0, 0, 0)
		containeropen.writePacket(this.player)
		this.cancelled = true
	}

	async execute() {
		await this._execute(this)
	}
}

module.exports = PlayerContainerCloseEvent;