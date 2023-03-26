export = ServerSetEntityDataPacket;
declare class ServerSetEntityDataPacket extends PacketConstructor {
    /**
     * Sets the field value for the player
     * @param {String} field
     * @param {Boolean} new_value
     */
    setValue(field: string, new_value: boolean): void;
    /**
     * Returns the field value
     * @returns {JSON}
     */
    getFieldValue(): JSON;
    /**
     * Sets properties for the packet
     * @param {JSON} new_properties
     */
    setProperties(new_properties: JSON): void;
    /**
     * Returns the properties of the packet
     * @returns {JSON}
     */
    getProperties(): JSON;
    /**
     * Sets the current tick
     * @param {Number} new_tick
     */
    setTick(new_tick: number): void;
    /**
     * Returns the current tick
     * @returns {Number}
     */
    getTick(): number;
    /**
     * Sets the runtime_entity_id
     * @param {String} new_runtime_entity_id
     */
    setRuntimeEntityID(new_runtime_entity_id: string): void;
    /**
     * Returns the runtime entity ID of the entity.
     * @returns {String}
     */
    getRuntimeEntityID(): string;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
