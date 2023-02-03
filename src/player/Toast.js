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
const ToastRequest = require("../network/packets/ToastRequest");

class Toast {
  /**
   * The constructor function is called when a new instance of the class is created
   */
  constructor() {
    /* It sets the title to an empty string. */
    this.title = "";
    /* It sets the message to an empty string. */
    this.message = "";
  }

  /**
   * It sets the title of the toast.
   * @param title - The title of the toast.
   */
  setTitle(title) {
    this.title = title;
  }

  /**
   * This function sets the message.
   * @param msg - The message to be displayed.
   */
  setMessage(msg) {
    this.message = msg;
  }

  /**
   * The function `getName()` returns the title
   * @returns The title.
   */
  getName() {
    return this.title;
  }

  /**
   * This function returns the message.
   * @returns The message.
   */
  getMessage() {
    return this.message;
  }

  /**
   * It sends a toast request to the client
   * @param client - The client that will receive the toast.
   */
  send(client) {
    /* It creates a new ToastRequest packet, sets the title and message, and sends it to the client. */
    let packet = new ToastRequest();
    /* It sets the title of the packet. */
    packet.setTitle(this.title);
    /* It sets the message of the packet. */
    packet.setMessage(this.message);
    /* It sends the packet to the client. */
    packet.send(client);
  }

  /**
   * Returns the toast as a string.
   * @returns The toast as a string.
   */
  toString() {
    return `${this.name}: ${this.message}`;
  }
}

module.exports = Toast;
