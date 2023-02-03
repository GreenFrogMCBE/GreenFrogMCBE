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
class ToastRequest extends require("./Packet") {
  constructor(title = '', message = '') {
    super(title, message);
    this.title = title;
    this.message = message;
  }

  /**
   * It returns the string "toast_request"
   * @returns The name of the packet.
   */
  name() {
    return "toast_request";
  }

  /**
   * The function takes a string as an argument and sets the title property of the object to that string.
   * @param title - The title of the modal.
   */
  setTitle(title) {
    this.title = title;
  }

  /**
   * The function takes a message as an argument and sets the message property of the object to the
   * message argument.
   * @param message - The message to be displayed.
   */
  setMessage(message) {
    this.message = message;
  }

  /**
   * It validates the packet, then writes the packet to the client
   * @param client - The client that the packet is being sent to.
   */
  send(client) {
    new Events().executeOT(client, require("../../Server"), this.title, this.message);
    client.write(this.name(), {
      title: this.title,
      message: this.message,
    });
  }
}

module.exports = ToastRequest;
