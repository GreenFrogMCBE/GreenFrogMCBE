const FormTypes = require("../../player/forms/FormTypes");
const Colors = require("../../player/Colors");

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
let content = Colors.red + "Invalid text!";
let buttons = null;
let title = Colors.red + "Invalid title!";
let type = "form";
let button1 = Colors.red + "Invalid button1!";
let button2 = Colors.red + "Invalid button2!";

class FormRequest extends require("./Packet") {
  name() {
    return "modal_form_request";
  }

  setId(id1) {
    id = id1;
  }

  setContent(content1) {
    content = content1;
  }

  setButtons(buttons1) {
    buttons = buttons1;
  }

  setTitle(title1) {
    title = title1;
  }

  setType(type1) {
    type = type1;
  }

  setButton1(_button1) {
    button1 = _button1;
  }

  setText(_text) {
    content = _text;
  }

  setButton2(_button2) {
    button2 = _button2;
  }

  getText() {
    return content;
  }

  getId() {
    return id;
  }

  getContent() {
    return content;
  }

  getButtons() {
    return buttons;
  }

  getTitle() {
    return title;
  }

  getType() {
    return type;
  }

  getButton1() {
    return button1;
  }

  getButton2() {
    return button2;
  }

  /**
   * It sends the form to the player
   * @param client - The client that you want to send the packet to.
   */
  send(client) {
    if (type === FormTypes.MODALFORM) {
      client.queue("modal_form_request", {
        form_id: this.getId(),
        data: `{"content":"${this.getText()}","button1":"${this.getButton1()}","button2":"${this.getButton2()}","type":"${this.getType()}","title":"${this.getTitle()}"}`,
      });
    } else {
      client.queue("modal_form_request", {
        form_id: this.getId(),
        data: `{"content":${this.getContent()},"buttons":${this.getButtons()},"type":"${this.getType()}","title":"${this.getTitle()}"}`,
      });
    }
  }
}

module.exports = FormRequest;
