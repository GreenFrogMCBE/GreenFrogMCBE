class SetCommandsEnabled extends require("./Packet") {
  name() {
    return "set_commands_enabled";
  }

  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  writePacket(client, enabled = true) {
    this.validate(client);
    client.write(this.name(), {
      enabled: enabled,
    });
  }
}

module.exports = SetCommandsEnabled;
