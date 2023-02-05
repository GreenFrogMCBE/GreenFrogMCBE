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
const FormRequest = require("../network/packets/FormRequest");

class Form {
  constructor() {
    this.content = "";
    this.type = "form";
    this.title = "";
    this.buttons = [];
    this.id = 0;
  }

  /**
   * Sets the id for the form
   * @param id
   */
  setId(id) {
    this.id = id;
  }

  /**
   * Sets the title for the form
   * @param title
   */
  setTitle(title) {
    this.title = title;
  }

  /**
   * Sets the content for the form
   * @param content
   */
  setContent(content) {
    this.content = content;
  }

  /**
   * Sets the buttons for the form
   * @param buttons
   */
  setButtons(buttons) {
    this.buttons = buttons;
  }

  /**
   * Sends the form to the client
   * @param client
   */
  send(client) {
    const FormReq = new FormRequest();
    FormReq.setId(this.id);
    FormReq.setTitle(this.title);
    FormReq.setText(this.content);
    FormReq.setButtons(JSON.stringify(this.buttons));
    FormReq.setType(this.type);
    FormReq.send(client);
  }
}

module.exports = Form;
