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
/* It's a class that sends a packet to the client to set the time */
class Time extends require("./Packet") {
  /**
   * It returns the string "set_time"
   * @returns The name of the function.
   */
  name() {
    return "set_time";
  }

  /**
   * It checks if the client is null, and if the time is a number. If either of these are true, it throws
   * an error
   * @param client - The client that sent the packet
   * @param time - The time in seconds to set the client's time to.
   */
  validate(client, time) {
    if (!client) throw new Error("Packet processing error. Client is null");
    if (parseInt(time) == NaN)
      throw new Error(
        "Packet processing error. A plugin tried to set an invalid time (time must be int, not string)"
      );
  }

  /**
   * It writes a packet to the client
   * @param client - The client that the packet is being sent to.
   * @param time - The time to send to the client.
   */
  writePacket(client, time) {
    this.validate(client, time);
    client.write(this.name(), {
      time: time,
    });
  }
}

module.exports = Time;
