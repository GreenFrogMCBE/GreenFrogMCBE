export = ServerInventorySlotPacket;
declare class ServerInventorySlotPacket extends PacketConstructor {
    /**
     * Sets the window ID.
     * @param {Number} ID
     */
    setWindowID(new_id: any): void;
    /**
     * Sets the slot of the item.
     * @param {Number} new_slot
     */
    setSlot(new_slot: number): void;
    /**
     * Sets the item data (NBT).
     * @param {JSON} new_item_data
     */
    setItemData(new_item_data: JSON): void;
    /**
     * Returns the window ID.
     * @returns {Number} The window ID.
     */
    getWindowID(): number;
    /**
     * Returns the slot of the item.
     * @returns {Number}
     */
    getSlot(): number;
    /**
     * Returns the item data (NBT).
     * @returns {JSON} The item data.
     */
    getItemData(): JSON;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
