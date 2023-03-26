export = ServerCreativeContentPacket;
declare class ServerCreativeContentPacket extends PacketConstructor {
    /**
     * Sets the items list
     * @param {Array<JSON>} new_items - item list
     */
    setItems(new_items: Array<JSON>): void;
    /**
     * Returns the item list
     * @returns {Array<JSON>} Item list
     */
    getItems(): Array<JSON>;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
