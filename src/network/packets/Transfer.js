/* eslint-disable no-dupe-class-members */
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
/* It's a class that sends a packet to the client to transfer them to another server */

let server_address = null;
let port = null;

class Transfer extends require("./Packet") {
  /**
   * It returns the string "transfer"
   * @returns The name of the function.
   */
  name() {
    return "transfer";
  }

  /**
   * Validates the client, address and port before processing a packet
   * @param {Object} client - The client to validate
   * @param {string} address - The server address to validate
   * @param {number} port - The server port to validate
   */
  validate(address, port) {
    if (!address)
      throw new Error("Packet processing error. Target server address is null");
    // eslint-disable-next-line use-isnan
    if (parseInt(port) == NaN)
      // isNaN will not work here
      throw new Error(
        "Packet processing error. A plugin tried to sent a player to invalid server (port must be int, not string)"
      );
  }

  /**
   * Sets the server address
   * @param {string} address
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
   * @returns The server address.
   */
  getServerAddress() {
    return server_address;
  }

  /**
   * @returns The server port.
   */
  getPort() {
    return port;
  }

  /**
   * @returns The server address.
   */
  getServerAddress() {
    return server_address;
  }

  /**
   * @returns The server port.
   */
  getPort() {
    return port;
  }

  /**
   * Writes a packet that transfers the client to another server
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
