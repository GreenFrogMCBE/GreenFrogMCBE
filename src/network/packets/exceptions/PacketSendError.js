class PacketSendError extends Error {
  constructor(message) {
    super(message);
    this.name = "PacketSendError";
  }
}

module.exports = PacketSendError;
