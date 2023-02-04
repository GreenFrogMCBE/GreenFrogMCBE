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
/* It's a class that sends a text packet to the client */
class FormRequest extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns Packet name
   */
  name() {
    return "modal_form_request";
  }

  /**
   * It sends the form to the player
   * @param client - The client that you want to send the packet to.
   * @param id - The id of the form.
   * @param text - The text that will be displayed in the form.
   * @param [jsonbuttons] - This is an array of buttons.
   * @param [title=null] - The title of the form.
   * @param [type=form] - The type of form.
   */
  send(client, id, text, jsonbuttons = [], title = null, type = "form") {
    client.write("modal_form_request", {
      form_id: id,
      data: `{"content":"${text}","buttons":${jsonbuttons},"type":"${type}","title":"${title}"}`,
    });
  }
}

module.exports = FormRequest;
