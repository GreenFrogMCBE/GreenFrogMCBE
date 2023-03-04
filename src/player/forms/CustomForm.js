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

class CustomForm {
  // I used this code: https://github.com/Zwuiix-cmd/EasyProxy for examples

  constructor() {
    this.type = FormTypes.CUSTOMFORM;
    this.title = Colors.red + "Invalid title!";
    this.buttons = [];
    this.id = 0;
    this.actions = [];
  }

  /**
   * Add an action.
   * @param action - The action to add to the list of actions.
   */
  addAction(action) {
    this.actions.push(action);
  }

  /**
   * Adds an input to the form.
   * @param text - The text that will be displayed in the input field.
   * @param [placeholder] - The text that will be displayed in the input box before the user types
   * anything.
   */
  addInput(text, placeholder = "") {
    this.addAction({ type: "input", text: text, placeholder: placeholder });
  }

  /**
   * It adds a label to the form
   * @param text - The text to display.
   */
  addText(text) {
    this.addAction({ type: "label", text: text });
  }

  /**
   * Adds a dropdown to the form.
   * @param {string} text
   * @param {JSON} options
   */
  addDropdown(text, options) {
    this.addAction({ type: "dropdown", text: text, options: options });
  }

  /**
   * Adds toggle button
   * @param {string} text
   */
  addToggle(text) {
    this.addAction({ type: "toggle", text: text });
  }

  /**
   * Adds slider to the form.
   * @param {string} text
   * @param {Number} min
   * @param {Number} max
   * @param {Number} step
   */
  addSlider(text, min, max, step = -1) {
    this.addAction({
      type: "slider",
      text: text,
      min: min,
      max: max,
      step: step,
    });
  }

  /**
   * Sends the form to the client
   * @param {Object} client
   */
  send(client) {
    const FormReq = new FormRequest();
    FormReq.setId(this.id);
    FormReq.setTitle(this.title);
    FormReq.setContent(JSON.stringify(this.actions));
    FormReq.setButtons(JSON.stringify(this.buttons));
    FormReq.setType(this.type);
    FormReq.send(client);
  }
}

module.exports = CustomForm;
