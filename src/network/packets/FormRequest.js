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
let id = 0;
let content = "";
let buttons = null;
let title = "";
let type = "form";

class FormRequest extends require("./Packet") {
  name() {
    return "modal_form_request";
  }

  /**
   * It sets the form id
   * @param {Number} Form id
   */
  setId(id1) {
    id = id1;
  }

  /**
   * It sets the form content
   * @param {JSON} Form content
   */
  setContent(content1) {
    content = content1;
  }

  /**
   * It sets the form buttons
   * @param {JSON} Form buttons
   */
  setButtons(buttons1) {
    buttons = buttons1;
  }

  /**
   * It sets the form title
   * @param {string} Form title
   */
  setTitle(title1) {
    title = title1;
  }

  /**
   * It sets the form type
   * @param {FormTypes} Form type
   */
  setType(type1) {
    type = type1;
  }

  /**
   * It returns the form id
   * @returns Form id
   */
  getId() {
    return id;
  }

  /**
   * It returns the form content
   * @returns Form content
   */
  getContent() {
    return content;
  }

  /**
   * It returns the form buttons
   * @returns Form buttons
   */
  getButtons() {
    return buttons;
  }

  /**
   * It returns the form title
   * @returns Form title
   */
  getTitle() {
    return title;
  }

  /**
   * It returns the form type
   * @returns Form type
   */
  getType() {
    return type;
  }

  /**
   * It sends the form to the player
   * @param client - The client that you want to send the packet to.
   */
  send(client) {
    client.write("modal_form_request", {
      form_id: this.getId(),
      data: `{"content":${JSON.stringify(
        this.getContent()
      )},"buttons":${this.getButtons()},"type":"${this.getType()}","title":"${this.getTitle()}"}`,
    });
  }
}

module.exports = FormRequest;
