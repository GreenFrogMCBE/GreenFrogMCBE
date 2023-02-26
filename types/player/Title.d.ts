declare enum Titles {
    TITLE = "title",
    SUBTITLE = "subtitle",
    ACTIONBAR = "actionbar",
}

declare class Title {
    private type: Titles;
    private text: string;
    private fadeintime: number;
    private fadeouttime: number;
    private staytime: number;

    /**
     * Sets the title
     * @param {Titles} type
     */
    setType(type: Titles): void;

    /**
     * Sets the text
     * @param {string} text
     */
    setText(text: string): void;

    /**
     * Sets the fade in time.
     * @param {Number} fadein
     */
    setFadeinTime(fadein: number): void;

    /**
     * Sets the stay time
     * @param {Number} staytime
     */
    setStayTime(staytime: number): void;

    /**
     * Sets the fadeout time
     * @param {Number} fadeout
     */
    setFadeoutTime(fadeout: number): void;

    /**
     * Returns the title type
     * @returns {Titles} The title type
     */
    getType(): Titles;

    /**
     * Returns the title text
     * @returns {string} The title text
     */
    getText(): string;

    /**
     * Returns the fade in time
     * @returns The fade in time
     */
    getFadeinTime(): number;

    /**
     * Returns the stay time
     * @returns The stay time
     */
    getStayTime(): number;

    /**
     * Returns the fade out time
     * @returns The fade out time
     */
    getFadeoutTime(): number;

    /**
     * Sends the title packet to the client
     * @param {Client} client The client to send the packet to
     */
    send(client: Client): void;
}

export = Title;
