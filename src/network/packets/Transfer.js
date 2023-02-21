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
/* eslint-disable use-isnan */
/* eslint-disable no-dupe-class-members */

let server_address = null;
let port = null;

const { lang } = require("../../server/ServerInfo");

class Transfer extends require("./Packet") {
  name() {
    return "transfer";
  }

  /**
   * This function should not be used outside this class
   * @param {Object} client - The client to validate
   * @param {String} address - The server address to validate
   * @param {Number} port - The server port to validate
   */
  validate(address, port) {
    if (!address) throw new Error(lang.errors.targetServerNull);
    if (parseInt(port) == NaN)
      // isNaN will not work here
      throw new Error(lang.sendToInvalidServer);
  }

  /**
   * Sets the server address
   * @param {String} address
   */
  setServerAddress(address) {
    server_address = address;
  }

  /**
   * Sets the server port
   * @param {Number} port1
   */
  setPort(port1) {
    port = port1;
  }

  /**
   * Returns the server address.
   * @returns The server address.
   */
  getServerAddress() {
    return server_address;
  }

  /**
   * Returns the server port.
   * @returns The server port.
   */
  getPort() {
    return port;
  }

  /**
   * Sends the packet
   * @param {Object} client - The client to send the packet to
   */
  send(client) {
    this.validate(this.getServerAddress(), this.getPort());
    client.write(this.name(), {
      server_address: this.getServerAddress(),
      port: parseInt(this.getPort()),
    });
  }
}

module.exports = Transfer;
