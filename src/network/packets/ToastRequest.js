class ToastRequest extends require("./Packet") {
  name() {
    return "toast_request";
  }

  validate(client, title, msg) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  writePacket(client, title = "", msg = "") {
    this.validate(client, title, msg);
    client.write(this.name(), {
      title: title,
      message: msg,
    });
  }
}

module.exports = ToastRequest;
