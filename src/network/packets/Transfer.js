/* It's a class that sends a packet to the client to transfer them to another server */
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
  validate(client, address, port) {
    if (!client) throw new Error("Packet processing error. Client is null");
    if (!address)
      throw new Error("Packet processing error. Target server address is null");
    if (parseInt(port) == NaN)
      throw new Error(
        "Packet processing error. A plugin tried to sent a player to invalid server (port must be int, not string)"
      );
  }

  /**
   * Writes a packet that transfers the client to another server
   * @param {Object} client - The client to send the packet to
   * @param {string} address - The server address
   * @param {number} port - The server port
   */
  writePacket(client, address, port) {
    this.validate(client, address, port);
    client.write(this.name(), {
      server_address: address,
      port: parseInt(port),
    });
  }
}

module.exports = Transfer;
