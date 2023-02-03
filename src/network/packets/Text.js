
/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░ 
 * 
 * 
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
*/
/* It's a class that sends a text packet to the client */
class Text extends require("./Packet") {
  /**
   * name() {
   *         return "text"
   * }
   * @returns Packet name
   */
  name() {
    return "text";
  }

  /**
   * If the client or type is null, throw an error.
   * @param client - The client that sent the packet.
   * @param type - The type of packet that was received.
   */
  validate(client, type) {
    if (!client) throw new Error("Packet processing error. Client is null");
    if (!type) throw new Error("Packet processing error. type is null");
  }

  /**
   * It writes a packet to the client
   * @param client - The client that will receive the packet.
   * @param [message] - The message to send.
   * @param [type=announcement] - The type of message. This can be "announcement", "text", "json", or
   * "tip".
   * @param [needs_translation=false] - If true, the message will be translated to the client's language.
   * @param [source_name] - The name of the source of the message.
   * @param [xuid] - The XUID of the player who sent the message.
   * @param [platform_chat_id] - This is the ID of the player you want to send the message to.
   */
  writePacket(
    client,
    message = "",
    type = "announcement",
    needs_translation = false,
    source_name = "",
    xuid = "",
    platform_chat_id = ""
  ) {
    this.validate(client, type);
    client.write(this.name(), {
      type: type,
      needs_translation: needs_translation,
      source_name: source_name,
      message: message,
      xuid: xuid,
      platform_chat_id: platform_chat_id,
    });
  }
}

module.exports = Text;
