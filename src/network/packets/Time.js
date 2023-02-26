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
  /**
   * @returns The name of the packet.
   */
  name() {
    return "set_time";
  }

  /**
   * @param client - The client that sent the packet
   * @param time - The time in seconds to set the client's time to.
   */
  validate(time) {
    if (parseInt(time) == NaN) throw new Error(lang.invalidTimePacket);
  }

  /**
   * It updates the time
   * @param {Number} time - The time in seconds to set the client's time to.
   */
  setTime(time1) {
    this.validate(time1);
    time = time1;
  }

  /**
   * It returns the time
   * @returns The time
   */
  getTime() {
    return time;
  }

  /**
   * @param {Object} client - The client that the packet is being sent to.
   */
  send(client) {
    this.validate(time);
    client.queue(this.name(), {
      time: this.getTime(),
    });
  }
}

module.exports = Time;
