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
const FormRequest = require("../../network/packets/FormRequest");
const Colors = require("../../player/Colors");
const FormTypes = require("./FormTypes");

class ModalForm {
  constructor() {
    this.title = Colors.red + "Invalid title!";
    this.text = Colors.red + "Invalid text!";
    this.button1 = Colors.red + "Invalid button1!";
    this.button2 = Colors.red + "Invalid button2!";
    this.id = 0;
  }

  /**
   * Sends the form to the client
   * @param {Object} client
   */
  send(client) {
    const FormReq = new FormRequest();
    FormReq.setType(FormTypes.MODALFORM);
    FormReq.setId(this.id);
    FormReq.setTitle(this.title);
    FormReq.setContent(this.text);
    FormReq.setButton1(this.button1);
    FormReq.setButton2(this.button2);
    FormReq.send(client);
  }
}

module.exports = ModalForm;
