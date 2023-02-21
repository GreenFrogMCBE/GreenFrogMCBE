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
  name() {
    return "toast_request";
  }

  /**
   * Sets the title of the toast.
   * @param title1 - The title of the toast.
   */
  setTitle(title1) {
    title = title1;
  }

  /**
   * Sets the message of the toast.
   * @param message1 - The message to be displayed.
   */
  setMessage(message1) {
    message = message1;
  }

  /**
   * Returns the title.
   * @returns The title.
   */
  getTitle() {
    return title;
  }

  /**
   * Returns the message.
   * @returns The message.
   */
  getMessage() {
    return message;
  }

  /**
   * @param client - The client that the packet is being sent to.
   */
  send(client) {
    client.write(this.name(), {
      title: this.getTitle(),
      message: this.getMessage(),
    });
  }
}

module.exports = ToastRequest;
