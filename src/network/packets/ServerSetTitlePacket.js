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
const Titles = require("./types/Titles");
const PacketConstructor = require("./PacketConstructor");

let type = Titles.TITLE;
let text = "";
let fadeinTime = -1;
let stayTime = -1;
let fadeoutTime = -1;
let xuid = "";
let platformOnlineId = "";

class ServerSetTitlePacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {String} The name of the packet.
	 */
	getPacketName() {
		return "set_title";
	}

	/**
	 * Returns whether the packet is critical or not.
	 * @returns {Boolean} Returns true if the packet is critical, false otherwise.
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the type of the title.
	 * @param {Titles} type1 - The type of the title.
	 */
	setType(type1) {
		type = type1;
	}

	/**
	 * Sets the text of the title.
	 * @param {String} text1 - The text of the title.
	 */
	setText(text1) {
		text = text1;
	}

	/**
	 * Sets the fade-in time of the title.
	 * @param {number} fadein - The fade-in time of the title.
	 */
	setFadeinTime(fadein) {
		fadeinTime = fadein;
	}

	/**
	 * Sets the stay time of the title.
	 * @param {number} staytime1 - The stay time of the title.
	 */
	setStaytime(staytime1) {
		stayTime = staytime1;
	}

	/**
	 * Sets the fade-out time of the title.
	 * @param {number} fadeout - The fade-out time of the title.
	 */
	setFadeoutTime(fadeout) {
		fadeoutTime = fadeout;
	}

	/**
	 * Sets the xuid of the title.
	 * @param {String} xuid1 - The xuid of the title.
	 */
	setXuid(xuid1) {
		xuid = xuid1;
	}

	/**
	 * Gets the text of the title.
	 * @returns {String} The text of the title.
	 */
	getText() {
		return text;
	}

	/**
	 * Gets the fade-in time of the title.
	 * @returns {number} The fade-in time of the title.
	 */
	getFadeinTime() {
		return fadeinTime;
	}

	/**
	 * Gets the stay time of the title.
	 * @returns {number} The stay time of the title.
	 */
	getStaytime() {
		return stayTime;
	}

	/**
	 * Gets the fade-out time of the title.
	 * @returns {number} The fade-out time of the title.
	 */
	getFadeout() {
		return fadeoutTime;
	}

	/**
	 * Gets the xuid of the title.
	 * @returns {String} The xuid of the title.
	 */
	getXuid() {
		return xuid;
	}

	/**
	 * Gets the platform online id of the title.
	 * @returns {String} The platform online id of the title.
	 */
	getPlatformOnlineId() {
		return platformOnlineId;
	}

	/**
	 * Gets the type of the title.
	 * @returns {Titles} The type of the title.
	 */
	getType() {
		return type;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		if (this.getType() === Titles.CLEAR) this.setText("");
		client.queue(this.getPacketName(), {
			type: this.getType(),
			text: this.getText(),
			fade_in_time: this.getFadeinTime(),
			stay_time: this.getStaytime(),
			fade_out_time: this.getFadeout(),
			xuid: this.getXuid(),
			platform_online_id: this.getPlatformOnlineId(),
		});
	}
}

module.exports = ServerSetTitlePacket;
