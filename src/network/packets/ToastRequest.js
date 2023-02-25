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

let title = "";
let message = "";

class ToastRequest extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "toast_request";
  }

  /**
   * It sets the title of the toast.
   * @param title1 - The title of the toast.
   */
  setTitle(title1) {
    title = title1;
  }

  /**
   * It sets the message of the toast.
   * @param message1 - The message to be displayed.
   */
  setMessage(message1) {
    message = message1;
  }

  /**
   * It returns the title.
   * @returns The title.
   */
  getTitle() {
    return title;
  }

  /**
   * It returns the message.
   * @returns The message.
   */
  getMessage() {
    return message;
  }

  /**
   * @param client - The client that the packet is being sent to.
   */
  send(client) {
    client.queue(this.name(), {
      title: this.getTitle(),
      message: this.getMessage(),
    });
  }
}

module.exports = ToastRequest;
