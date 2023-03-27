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
export = ServerSetTitlePacket;
declare class ServerSetTitlePacket extends PacketConstructor {
	/**
	 * Sets the type of the title.
	 * @param {Titles} type1 - The type of the title.
	 */
	setType(type1: Titles): void;
	/**
	 * Sets the text of the title.
	 * @param {String} text1 - The text of the title.
	 */
	setText(text1: string): void;
	/**
	 * Sets the fade-in time of the title.
	 * @param {number} fadein - The fade-in time of the title.
	 */
	setFadeinTime(fadein: number): void;
	/**
	 * Sets the stay time of the title.
	 * @param {number} staytime1 - The stay time of the title.
	 */
	setStaytime(staytime1: number): void;
	/**
	 * Sets the fade-out time of the title.
	 * @param {number} fadeout - The fade-out time of the title.
	 */
	setFadeoutTime(fadeout: number): void;
	/**
	 * Sets the xuid of the title.
	 * @param {String} xuid1 - The xuid of the title.
	 */
	setXuid(xuid1: string): void;
	/**
	 * Gets the text of the title.
	 * @returns {String} The text of the title.
	 */
	getText(): string;
	/**
	 * Gets the fade-in time of the title.
	 * @returns {number} The fade-in time of the title.
	 */
	getFadeinTime(): number;
	/**
	 * Gets the stay time of the title.
	 * @returns {number} The stay time of the title.
	 */
	getStaytime(): number;
	/**
	 * Gets the fade-out time of the title.
	 * @returns {number} The fade-out time of the title.
	 */
	getFadeout(): number;
	/**
	 * Gets the xuid of the title.
	 * @returns {String} The xuid of the title.
	 */
	getXuid(): string;
	/**
	 * Gets the platform online id of the title.
	 * @returns {String} The platform online id of the title.
	 */
	getPlatformOnlineId(): string;
	/**
	 * Gets the type of the title.
	 * @returns {Titles} The type of the title.
	 */
	getType(): Titles;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
