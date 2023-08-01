/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../../Frog");

const TitlePacket = require("../../network/packets/ServerSetTitlePacket");

const Title = require("../types/Title");

/**
 * Represents a title that can be sent to a client.
 */
class Title {
	/**
	 * Constructs a new Title object.
	 */
	constructor() {
		/** @type {Titles} The type of the title */
		this.type = Title.TITLE;
		/** @type {string} The text to display in the title */
		this.text;
		/** @type {number} The time it takes for the title to fade in */
		this.fadeInTime = 20;
		/** @type {number} The time the title will stay on the screen */
		this.stayTime = 20;
		/** @type {number} The time it takes for the title to fade out */
		this.fadeOutTime = 20;
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
			fadeinTime: this.getFadeInTime(),
			fadeoutTime: this.getFadeOutTime(),
			stayTime: this.getStayTime(),
			text: this.getText(),
			type: this.getType(),
			cancel: () => {
				shouldSendTitle = false;
			},
		});

		if (!shouldSendTitle) return;

		const titlePacket = new TitlePacket();
		titlePacket.setFadeInTime(this.getFadeInTime());
		titlePacket.setStayTime(this.getStayTime());
		titlePacket.setText(this.getText());
		titlePacket.setType(this.getType());
		titlePacket.setFadeOutTime(this.getFadeOutTime());
		titlePacket.send(client);
	}
}

module.exports = Title;
