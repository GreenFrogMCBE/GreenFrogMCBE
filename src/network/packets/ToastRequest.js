
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
/* This class is used to send a toast request to the client. */
class ToastRequest extends require("./Packet") {
  /**
   * It returns the string "toast_request"
   * @returns The name of the packet.
   */
  name() {
    return "toast_request";
  }

  /**
   * "If the client is null, throw an error."
   * @param client - The client that sent the packet.
   */
  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  /**
   * It validates the packet, then writes the packet to the client
   * @param client - The client that the packet is being sent to.
   * @param [title] - The title of the message.
   * @param [msg] - The message to be sent to the client.
   */
  writePacket(client, title = "", msg = "") {
    this.validate(client);
    client.write(this.name(), {
      title: title,
      message: msg,
    });
  }
}

module.exports = ToastRequest;
