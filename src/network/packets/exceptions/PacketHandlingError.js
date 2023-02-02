class PacketHandlingError extends Error {
  constructor(message) {
    super(message);
    this.name = "PacketHandlingError";
  }
}

module.exports = PacketHandlingError;
