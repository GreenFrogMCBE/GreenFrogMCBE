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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const TitleType = require("../../api/types/TitleType");

const PacketConstructor = require("./PacketConstructor");

let type = TitleType.TITLE;
let text = "";
let fadeinTime = -1;
let stayTime = -1;
let fadeoutTime = -1;
let xuid = "";
let platformOnlineId = "";

class ServerSetTitlePacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string}.
	 */
	getPacketName() {
		return "set_title";
	}

	/**
	 * Returns whether the packet is critical or not.
	 * @returns {boolean} Returns true if the packet is critical, false otherwise.
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the type of the title.
	 * @param {Titles} new_type - The type of the title.
	 */
	setType(new_type) {
		type = new_type;
	}

	/**
	 * Sets the text of the title.
	 * @param {string} new_text - The text of the title.
	 */
	setText(new_text) {
		text = new_text;
	}

	/**
	 * Sets the fade-in time of the title.
	 * @param {number} new_fadein - The fade-in time of the title.
	 */
	setFadeInTime(new_fadein) {
		fadeinTime = new_fadein;
	}

	/**
	 * Sets the stay time of the title.
	 * @param {number} staytime1 - The stay time of the title.
	 */
	setStayTime(new_staytime) {
		stayTime = new_staytime;
	}

	/**
	 * Sets the fade-out time of the title.
	 * @param {number} fadeout - The fade-out time of the title.
	 */
	setFadeOutTime(new_fadeout) {
		fadeoutTime = new_fadeout;
	}

	/**
	 * Sets the xuid of the title.
	 * @param {string} xuid1 - The xuid of the title.
	 */
	setXuid(new_xuid) {
		xuid = new_xuid;
	}

	/**
	 * Gets the text of the title.
	 * @returns {string} The text of the title.
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
	 * @returns {string} The xuid of the title.
	 */
	getXuid() {
		return xuid;
	}

	/**
	 * Gets the platform online id of the title.
	 * @returns {string} The platform online id of the title.
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
	 * @param {Client} client
	 */
	send(client) {
		if (this.getType() === TitleType.CLEAR) this.setText("");

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
