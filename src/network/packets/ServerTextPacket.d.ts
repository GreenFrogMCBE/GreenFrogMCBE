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
export = ServerTextPacket;
declare class ServerTextPacket extends PacketConstructor {
	/**
	 * Sets the message to be sent
	 * @param {String} new_message
	 */
	setMessage(new_message: string): void;
	/**
	 * Sets the type
	 * @param {TextType} new_type
	 */
	setType(new_type: { RAW: string; CHAT: string; TRANSLATION: string; POPUP: string; JUKEBOX_POPUP: string; TIP: string; SYSTEM: string; WHISPER: string; ANNOUNCEMENT: string; OBJECT: string; OBJECTWISPHER: string }): void;
	/**
	 * Sets the if the message needs translation
	 * @param {Boolean} new_needs_translation
	 */
	setNeedsTranslation(new_needs_translation: boolean): void;
	/**
	 * Sets the source name
	 * @param {String} new_source_name
	 */
	setSourceName(new_source_name: string): void;
	/**
	 * Sets the XUID
	 * @param {String} new_xuid
	 */
	setXuid(new_xuid: string): void;
	/**
	 * Sets the platform chat id
	 * @param {String} new_platform_chat_id
	 */
	setPlatformChatId(new_platform_chat_id: string): void;
	/**
	 * Returns the message
	 * @returns {String}
	 */
	getMessage(): string;
	/**
	 * Returns the type
	 * @returns {TextType}
	 */
	getType(): {
		RAW: string;
		CHAT: string;
		TRANSLATION: string;
		POPUP: string;
		JUKEBOX_POPUP: string;
		TIP: string;
		SYSTEM: string;
		WHISPER: string;
		ANNOUNCEMENT: string;
		OBJECT: string;
		OBJECTWISPHER: string;
	};
	/**
	 * Returns the needs translation
	 * @returns {Boolean}
	 */
	getNeedsTranslation(): boolean;
	/**
	 * Returns the source name
	 * @returns {String}
	 */
	getSourceName(): string;
	/**
	 * Returns the XUID
	 * @returns {String}
	 */
	getXuid(): string;
	/**
	 * Returns the platform chat id
	 * @returns {String}
	 */
	getPlatformChatId(): string;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
