export = ServerSetTitlePacket;
declare class ServerSetTitlePacket extends PacketConstructor {
    /**
     * Sets the type of the title.
     * @param {Titles} new_type - The type of the title.
     */
    setType(new_type: Titles): void;
    /**
     * Sets the text of the title.
     * @param {String} new_text - The text of the title.
     */
    setText(new_text: string): void;
    /**
     * Sets the fade-in time of the title.
     * @param {Number} new_fadein - The fade-in time of the title.
     */
    setFadeinTime(new_fadein: number): void;
    /**
     * Sets the stay time of the title.
     * @param {Number} staytime1 - The stay time of the title.
     */
    setStaytime(new_staytime: any): void;
    /**
     * Sets the fade-out time of the title.
     * @param {Number} fadeout - The fade-out time of the title.
     */
    setFadeoutTime(new_fadeout: any): void;
    /**
     * Sets the xuid of the title.
     * @param {String} xuid1 - The xuid of the title.
     */
    setXuid(new_xuid: any): void;
    /**
     * Gets the text of the title.
     * @returns {String} The text of the title.
     */
    getText(): string;
    /**
     * Gets the fade-in time of the title.
     * @returns {Number} The fade-in time of the title.
     */
    getFadeinTime(): number;
    /**
     * Gets the stay time of the title.
     * @returns {Number} The stay time of the title.
     */
    getStaytime(): number;
    /**
     * Gets the fade-out time of the title.
     * @returns {Number} The fade-out time of the title.
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
    send(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
