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
  constructor() {
    this.title = "";
    this.message = "";
  }

  setTitle(title) {
    this.title = title;
  }

  setMessage(msg) {
    this.message = msg;
  }

  getName() {
    return this.title;
  }

  getMessage() {
    return this.message;
  }

  send(client) {
    let packet = new ToastRequest();
    packet.setTitle(this.title);
    packet.setMessage(this.message);
    packet.send(client);
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}

module.exports = Toast;
