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
let status = "";

class PlayStatus extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns The packet name
   */
  name() {
    return "play_status";
  }

  /**
   * SetStatus(status1) {
   *     status = status1;
   * }
   * @param status1 - The status
   */
  setStatus(status1) {
    status = status1;
  }

  /**
   * It returns the status.
   * @returns The status
   */
  getStatus() {
    return status;
  }

  /**
   * Sends the packet to the client
   * @param {Object} client
   */
  send(client) {
    client.write(this.name(), {
      status: this.getStatus(),
    });
  }
}

module.exports = PlayStatus;
