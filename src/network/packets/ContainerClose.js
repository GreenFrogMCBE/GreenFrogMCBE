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
let window_id = 0;
let server = false;

class ContainerClose extends require("./Packet") {
  name() {
    return "container_close";
  }

  /**
   * It sets the window id
   * @param {Number} id
   */
  setWindowId(id) {
    window_id = id;
  }

  /**
   * It sets the if the request is coming from server
   * @param {Boolean} server1
   */
  setServer(server1) {
    server = server1;
  }

  /**
   * It returns the window id 
   * @returns The window id 
   */
  getWindowId() {
    return window_id;
  }

  /**
   * It returns the if request is coming from server 
   * @returns The server field 
   */
  getServer() {
    return server;
  }

  send(client) {
    client.write(this.name(), {
      window_id: this.getWindowId(),
      server: this.getServer(),
    });
  }
}

module.exports = ContainerClose;
