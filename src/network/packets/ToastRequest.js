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

const Events = require("../../server/Events");

/* This class is used to send a toast request to the client. */

let title = "";
let message = "";

class ToastRequest extends require("./Packet") {
  /**
   * It returns the string "toast_request"
   * @returns The name of the packet.
   */
  name() {
    return "toast_request";
  }

  /**
   * The function takes a string as an argument and sets the title property of the object to that string.
   * @param title1 - The title of the modal.
   */
  setTitle(title1) {
    title = title1;
  }

  /**
   * The function takes a message as an argument and sets the message property of the object to the
   * message argument.
   * @param message1 - The message to be displayed.
   */
  setMessage(message1) {
    message = message1;
  }

  /**
   * @returns The title.
   */
  getTitle() {
    return title;
  }

  /**
   * @returns The message.
   */
  getMessage() {
    return message;
  }

  /**
   * It validates the packet, then writes the packet to the client
   * @param client - The client that the packet is being sent to.
   */
  send(client) {
    Events.executeOT(
      client,
      require("../../Server").server,
      this.getTitle(),
      this.getMessage()
    );
    client.write(this.name(), {
      title: this.getTitle(),
      message: this.getMessage(),
    });
  }
}

module.exports = ToastRequest;
