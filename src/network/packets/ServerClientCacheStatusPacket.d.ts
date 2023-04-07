export = ServerClientCacheStatusPacket;
declare class ServerClientCacheStatusPacket extends PacketConstructor {
    /**
     * Returns the packet name
     * @returns {String} The name of the packet
     */
    name(): string;
    /**
     * Sets if the caching is enabled?
     * @param {Boolean} new_enabled - Caching enabled?
     */
    setEnabled(new_enabled: boolean): void;
    /**
     * Returns if the caching is enabled
     * @returns {Boolean} If the caching is enabled.
     */
    getEnabled(): boolean;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
