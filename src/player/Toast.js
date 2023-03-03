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
const ServerToastRequest = require("../plugin/events/ServerToastRequest");

class Toast {
  constructor() {
    this.title = null;
    this.message = null;
  }

  /**
   * Sets the title.
   * @param {String} title
   */
  setTitle(title) {
    this.title = title;
  }

  /**
   * Sets the message.
   * @param {String} message
   */
  setMessage(message) {
    this.message = message;
  }

  /**
   * Sends the toast
   * @param {Object} client
   */
  send(client) {
    const toast = new ServerToastRequest();
    toast.execute(
      require("../Server").server,
      client,
      this.title,
      this.message
    );
  }
}

module.exports = Toast;
