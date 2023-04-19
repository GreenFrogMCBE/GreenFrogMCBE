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
const TextType = require("./types/TextType");
const PacketConstructor = require("./PacketConstructor");

let message;
let type = TextType.ANNOUNCEMENT;
let needs_translation = false;
let source_name;
let xuid;
let platform_chat_id;

class ServerTextPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string} The name of the packet.
	 */
	getPacketName() {
		return "text";
	}

	/**
	 * Returns whether the packet is critical or not.
	 * @returns {boolean} Returns true if the packet is critical, false otherwise.
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the message to be sent
	 * @param {string} new_message
	 */
	setMessage(new_message) {
		message = new_message;
	}

	/**
	 * Sets the type
	 * @param {TextType} new_type
	 */
	setType(new_type) {
		type = new_type;
	}

	/**
	 * Sets the if the message needs translation
	 * @param {boolean} new_needs_translation
	 */
	setNeedsTranslation(new_needs_translation) {
		needs_translation = new_needs_translation;
	}

	/**
	 * Sets the source name
	 * @param {string} new_source_name
	 */
	setSourceName(new_source_name) {
		source_name = new_source_name;
	}

	/**
	 * Sets the XUID
	 * @param {string} new_xuid
	 */
	setXuid(new_xuid) {
		xuid = new_xuid;
	}

	/**
	 * Sets the platform chat id
	 * @param {string} new_platform_chat_id
	 */
	setPlatformChatId(new_platform_chat_id) {
		platform_chat_id = new_platform_chat_id;
	}

	/**
	 * Returns the message
	 * @returns {string}
	 */
	getMessage() {
		return message;
	}

	/**
	 * Returns the type
	 * @returns {TextType}
	 */
	getType() {
		return type;
	}

	/**
	 * Returns the needs translation
	 * @returns {boolean}
	 */
	getNeedsTranslation() {
		return needs_translation;
	}

	/**
	 * Returns the source name
	 * @returns {string}
	 */
	getSourceName() {
		return source_name;
	}

	/**
	 * Returns the XUID
	 * @returns {string}
	 */
	getXuid() {
		return xuid;
	}

	/**
	 * Returns the platform chat id
	 * @returns {string}
	 */
	getPlatformChatId() {
		return platform_chat_id;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			type: this.getType(),
			needs_translation: this.getNeedsTranslation(),
			source_name: this.getSourceName(),
			message: this.getMessage(),
			xuid: this.getXuid(),
			platform_chat_id: this.getPlatformChatId(),
		});
	}
}

module.exports = ServerTextPacket;
