export = ServerChangeDimensionPacket;
declare class ServerChangeDimensionPacket extends PacketConstructor {
    /**
     * Sets the dimension
     * @param {Dimensions} new_dimension
     */
    setDimension(new_dimension: {
        readonly OVERWORLD: 0;
        readonly NETHER: 1;
        readonly END: 2;
    }): void;
    /**
     * Sets the spawn position
     * @param {float} x
     * @param {float} y
     * @param {float} z
     */
    setPosition(x: float, y: float, z: float): void;
    /**
     * Sets if the player needs to be respawned after the dimension change (default = false)
     * @param {boolean} needs_respawn
     */
    setRespawn(needs_respawn: boolean): void;
    /**
     * Returns the dimension
     * @returns {Dimensions} The dimension
     * @type {import("./types/Dimension")}
     */
    getDimension(): {
        readonly OVERWORLD: 0;
        readonly NETHER: 1;
        readonly END: 2;
    };
    /**
     * Returns if the player needs the be respawned
     * @returns {boolean} If the player needs to be respawned
     */
    getRespawn(): boolean;
    /**
     * Returns the position of the player
     * @returns {JSON} The position of the player
     */
    getPosition(): JSON;
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
