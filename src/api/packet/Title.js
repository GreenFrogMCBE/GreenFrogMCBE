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
const Frog = require("../../Frog");

const TitlePacket = require("../../network/packets/ServerSetTitlePacket");

const TitleType = require("../../network/packets/types/TitleType");

/**
 * Represents a title that can be sent to a client.
 */
class Title {
	/**
	 * Constructs a new Title object.
	 */
	constructor() {
		/** @type {Titles} The type of the title */
		this.type = TitleType.TITLE;
		/** @type {string} The text to display in the title */
		this.text;
		/** @type {number} The time it takes for the title to fade in */
		this.fadeInTime = 0;
		/** @type {number} The time the title will stay on the screen */
		this.stayTime = 0;
		/** @type {number} The time it takes for the title to fade out */
		this.fadeOutTime = 0;
	}

	/**
	 * Sets the type of the title.
	 *
	 * @param {Titles} type - The type of the title.
	 */
	setType(type) {
		this.type = type;
	}

	/**
	 * Sets the text to display in the title.
	 *
	 * @param {string} text - The text to display in the title.
	 */
	setText(text) {
		this.text = text;
	}

	/**
	 * Sets the time it takes for the title to fade in.
	 *
	 * @param {number} fadeInTime - The time it takes for the title to fade in.
	 */
	setFadeInTime(fadeInTime) {
		this.fadeInTime = fadeInTime;
	}

	/**
	 * Sets the time the title will stay on the screen.
	 *
	 * @param {number} stayTime - The time the title will stay on the screen.
	 */
	setStayTime(stayTime) {
		this.stayTime = stayTime;
	}

	/**
	 * Sets the time it takes for the title to fade out.
	 *
	 * @param {number} fadeOutTime - The time it takes for the title to fade out.
	 */
	setFadeOutTime(fadeOutTime) {
		this.fadeOutTime = fadeOutTime;
	}

	/**
	 * Returns the type of the title.
	 *
	 * @returns {Titles} The type of the title.
	 */
	getType() {
		return this.type;
	}

	/**
	 * Returns the text to display in the title.
	 *
	 * @returns {string} The text to display in the title.
	 */
	getText() {
		return this.text;
	}

	/**
	 * Returns the time it takes for the title to fade in.
	 *
	 * @returns {number} The time it takes for the title to fade in.
	 */
	getFadeInTime() {
		return this.fadeInTime;
	}

	/**
	 * Returns the time the title will stay on the screen.
	 *
	 * @returns {number} The time the title will stay on the screen.
	 */
	getStayTime() {
		return this.stayTime;
	}

	/**
	 * Returns the time it takes for the title to fade out.
	 *
	 * @returns {number} The time it takes for the title to fade out.
	 */
	getFadeOutTime() {
		return this.fadeOutTime;
	}

	/**
	 * Sends the title to the client
	 *
	 * @param {Client} client The client to send the title to
	 */
	send(client) {
		let shouldSendTitle = true;

		Frog.eventEmitter.emit("serverTitle", {
			fadeinTime: this.getFadeinTime(),
			fadeoutTime: this.getFadeoutTime(),
			stayTime: this.getStayTime(),
			text: this.getText(),
			type: this.getType(),
			cancel: () => {
				shouldSendTitle = false;
			},
		});

		if (!shouldSendTitle) return;

		const titlePacket = new TitlePacket();
		titlePacket.setFadeinTime(this.getFadeinTime());
		titlePacket.setStaytime(this.getStayTime());
		titlePacket.setText(this.getText());
		titlePacket.setType(this.getType());
		titlePacket.setFadeoutTime(this.getFadeoutTime());
		titlePacket.send(client);
	}
}

module.exports = Title;
