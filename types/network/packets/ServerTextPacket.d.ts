export = ServerTextPacket;
declare class ServerTextPacket extends PacketConstructor {
    message: any;
    type: any;
    needs_translation: any;
    source_name: any;
    xuid: any;
    platform_chat_id: any;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
