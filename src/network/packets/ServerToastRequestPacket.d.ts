export = ServerToastRequestPacket;
declare class ServerToastRequestPacket extends PacketConstructor {
    /**
     * Sets the title of the toast.
     * @param new_title
     */
    setTitle(new_title: any): void;
    /**
     * Sets the message of the toast.
     * @param new_messaged.
     */
    setMessage(new_message: any): void;
    /**
     * Returns the title.
     * @returns {String}
     */
    getTitle(): string;
    /**
     * Returns the message.
     * @returns {String}
     */
    getMessage(): string;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
