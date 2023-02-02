class ClientCacheStatus extends require("./Packet") {
  name() {
    return "client_cache_status";
  }

  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  writePacket(client, enabled = false) {
    this.validate(client);
    client.write(this.name(), {
      enabled: enabled,
    });
  }
}

module.exports = ClientCacheStatus;
