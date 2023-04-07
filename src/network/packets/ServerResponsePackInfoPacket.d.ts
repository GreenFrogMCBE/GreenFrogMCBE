export = ServerResponsePackInfoPacket;
declare class ServerResponsePackInfoPacket extends PacketConstructor {
    /**
     * Sets if the client must accept the packet
     * @param {Boolean} new_must_accept
     */
    setMustAccept(new_must_accept: boolean): void;
    /**
     * Sets, if the resource pack has scripts
     * @param {Boolean} new_has_scripts
     */
    setHasScripts(new_has_scripts: boolean): void;
    /**
     * Sets the list of behavior packs
     * @param {Array} new_behavior_packs
     */
    setBehaviorPacks(new_behavior_packs: Array): void;
    /**
     * Sets the list of texture packs
     * @param {Array} new_texture_packs
     */
    setTexturePacks(new_texture_packs: Array): void;
    /**
     * Returns if the resource pack is forced to accept.
     * @returns {Boolean}
     */
    getMustAccept(): boolean;
    /**
     * Returns if the resource pack has scripts.
     * @returns {Boolean}
     */
    getHasScripts(): boolean;
    /**
     * Returns the list of behavior packs.
     * @returns {Array}.
     */
    getBehaviorPacks(): Array;
    /**
     * Returns the list of texture packs.
     * @returns {Array}.
     */
    getTexturePacks(): Array;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
