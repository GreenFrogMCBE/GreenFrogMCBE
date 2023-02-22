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

let time = 0;

const { lang } = require("../../server/ServerInfo");

class Time extends require("./Packet") {
  name() {
    return "set_time";
  }

  /**
   * This function should not be used outside this class
   * @param client - The client that sent the packet
   * @param time - The time in seconds to set the client's time to.
   */
  validate(time) {
    if (parseInt(time) == NaN) throw new Error(lang.invalidTimePacket);
  }

  /**
   * Sets the time
   * @param {Number} time - The time in ms to set the client's time to.
   */
  setTime(time1) {
    time = time1;
  }

  /**
   * Returns the time
   * @returns The time
   */
  getTime() {
    return time;
  }

  /**
   * Sends the packet
   * @param {Object} client - The client that the packet is being sent to.
   */
  send(client) {
    this.validate(time);
    client.write(this.name(), {
      time: this.getTime(),
    });
  }
}

module.exports = Time;
