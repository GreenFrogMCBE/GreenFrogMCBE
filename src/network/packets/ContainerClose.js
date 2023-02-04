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
let window_id = 0
let server = false

class ContainerClose extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns Packet name
   */
  name() {
    return "container_close";
  }

  /**
   * It sets the window id field
   * @param {Number} id
   */
  setWindowId(id) {
    window_id = id;
  }

  /**
   * It sets the server field
   * @param {Boolean} server1
   */
  setServer(server1) {
    server = server1;
  }

  /**
   * It returns the window id field
   * @returns The window id field
   */
  getWindowId() {
    return window_id;
  }

  /**
   * It returns the server field
   * @returns The server field
   */
  getServer() {
    return server
  }

  /**
   * It sends the packet
   * @param {Object} client 
   */
  send(client) {
    client.write(this.name(), {
      window_id: this.getWindowId(),
      server: this.getServer(),
    });
  }
}

module.exports = ContainerClose;
