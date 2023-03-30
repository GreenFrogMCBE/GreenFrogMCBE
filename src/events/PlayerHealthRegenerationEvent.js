/**
 * @deprecated Please use PlayerHealthUpdateEvent 
 *
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

const UnsupportedOperationException = require("./exceptions/UnsupportedOperationException");

class PlayerHealthUpdateEvent extends Event {
	/**
 	 * @deprecated Please use PlayerHealthUpdateEvent
	 */
	constructor() {
		super();
		this.name = "PlayerHealthRegenerationEvent";
		this.player = null;
		this.server = null;
	}

	/**
 	 * @deprecated Please use PlayerHealthUpdateEvent
	 */
	cancel() {
		throw new UnsupportedOperationException("This event cannnot be cancelled. Please use PlayerHealthUpdateEvent")
	}

	/**
 	 * @deprecated Please use PlayerHealthUpdateEvent
	 */
	async execute() {
		await this._execute(this);
	}
}

module.exports = PlayerHealthUpdateEvent;
