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
export = ServerTextPacket;
declare class ServerTextPacket extends PacketConstructor {
	/**
	 * Sets the message to be sent
	 * @param {string} new_message
	 */
	setMessage(new_message: string): void;
	/**
	 * Sets the type
	 * @param {TextType} new_type
	 */
	setType(new_type: { readonly RAW: "raw"; readonly CHAT: "chat"; readonly TRANSLATION: "translation"; readonly POPUP: "popup"; readonly JUKEBOX_POPUP: "jukebox_popup"; readonly TIP: "tip"; readonly SYSTEM: "system"; readonly WHISPER: "whisper"; readonly ANNOUNCEMENT: "announcement"; readonly OBJECT: "object"; readonly OBJECTWISPHER: "object_whisper" }): void;
	/**
	 * Sets the if the message needs translation
	 * @param {boolean} new_needs_translation
	 */
	setNeedsTranslation(new_needs_translation: boolean): void;
	/**
	 * Sets the source name
	 * @param {string} new_source_name
	 */
	setSourceName(new_source_name: string): void;
	/**
	 * Sets the XUID
	 * @param {string} new_xuid
	 */
	setXuid(new_xuid: string): void;
	/**
	 * Sets the platform chat id
	 * @param {string} new_platform_chat_id
	 */
	setPlatformChatId(new_platform_chat_id: string): void;
	/**
	 * Returns the message
	 * @returns {string}
	 */
	getMessage(): string;
	/**
	 * Returns the type
	 * @returns {TextType}
	 */
	getType(): {
		readonly RAW: "raw";
		readonly CHAT: "chat";
		readonly TRANSLATION: "translation";
		readonly POPUP: "popup";
		readonly JUKEBOX_POPUP: "jukebox_popup";
		readonly TIP: "tip";
		readonly SYSTEM: "system";
		readonly WHISPER: "whisper";
		readonly ANNOUNCEMENT: "announcement";
		readonly OBJECT: "object";
		readonly OBJECTWISPHER: "object_whisper";
	};
	/**
	 * Returns the needs translation
	 * @returns {boolean}
	 */
	getNeedsTranslation(): boolean;
	/**
	 * Returns the source name
	 * @returns {string}
	 */
	getSourceName(): string;
	/**
	 * Returns the XUID
	 * @returns {string}
	 */
	getXuid(): string;
	/**
	 * Returns the platform chat id
	 * @returns {string}
	 */
	getPlatformChatId(): string;
	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
