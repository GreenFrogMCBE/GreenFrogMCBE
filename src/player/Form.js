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
const FormTypes = require("./FormTypes");

class Form {
  constructor() {
    this.content = "";
    this.type = FormTypes.FORM;
    this.title = "";
    this.buttons = [];
    this.id = 0;
    this.actions = [
      content
    ]
  }



  send(client) {
    const FormReq = new FormRequest();
    FormReq.setId(this.id);
    FormReq.setTitle(this.title);
    if (this.actions.length === 1) {
      FormReq.setText(this.content);
    } else {
      FormReq.setText(this.actions);
    }
    FormReq.setButtons(JSON.stringify(this.buttons));
    FormReq.setType(this.type);
    FormReq.send(client);
  }
}

module.exports = Form;
