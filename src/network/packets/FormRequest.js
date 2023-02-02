/* It's a class that sends a text packet to the client */
class FormRequest extends require("./Packet") {
  /**
   * name() {
   *         return "modal_form_request"
   * }
   * @returns Packet name
   */
  name() {
    return "modal_form_request";
  }

  /**
   * "If the client is null, throw an error."
   * @param client - The client that sent the packet.
   * @param type - The type of packet. This is the first parameter in the packet.
   */
  validate(client, type) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  /**
   * It sends a form to the player
   * @param client - The client that you want to send the packet to.
   * @param id - The id of the form.
   * @param text - The text that will be displayed in the form.
   * @param [jsonbuttons] - This is an array of buttons.
   * @param [title=null] - The title of the form.
   * @param [type=form] - The type of form.
   */
  writePacket(client, id, text, jsonbuttons = [], title = null, type = "form") {
    this.validate(client);
    client.write("modal_form_request", {
      form_id: id,
      data: `{"content":"${text}","buttons":${jsonbuttons},"type":"${type}","title":"${title}"}`,
    });
  }
}

module.exports = FormRequest;
