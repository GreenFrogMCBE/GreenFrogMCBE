export = ServerContainerOpenPacket;
declare class ServerContainerOpenPacket extends PacketConstructor {
    /**
     * Sets the coordinates of the container
     * If the container is creative menu then the cords are xyz: 0, 0, 0
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    setCoordinates(x: number, y: number, z: number): void;
    /**
     * Sets the window type
     * @param {WindowTypes} new_window_type
     */
    setWindowType(new_window_type: WindowTypes): void;
    /**
     * It sets the window ID
     * @param {WindowID} new_window_id
     */
    setWindowID(new_window_id: WindowID): void;
    /**
     * It sets the runtime entity id
     * @param {String} new_runtime_entity_id
     */
    setRuntimeEntityId(new_runtime_entity_id: string): void;
    /**
     * It returns the window ID
     * @returns {Number} The window ID
     */
    getWindowID(): number;
    /**
     * It returns the runtime entity ID
     * @returns {String} The runtime entity ID
     */
    getCoordinates(): string;
    /**
     * Returns the window type
     * @returns {WindowType} The window type
     */
    getWindowType(): WindowType;
    /**
     * Returns the runtime entity id
     * @returns {String} The runtime entity id
     */
    getRuntimeEntityId(): string;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
