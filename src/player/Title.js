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
const Titles = require("../network/packets/types/Titles");

class Title {
  constructor() {
    this.type = Titles.TITLE;
    this.text = null;
  }

  /**
   * Sets the title
   * @param {Titles} type
   */
  setType(type) {
    this.type = type;
  }

  /**
   * Sets the text
   * @param {string} text
   */
  setText(text) {
    if (this.type === Titles.TITLE) text = "";
    this.text = text;
  }

  /**
   * Sets the fade in time.
   * @param {Number} fadein
   */
  setFadeinTime(fadein) {
    this.fadeintime = fadein;
  }

  /**
   * Sets the stay time
   * @param {Number} staytime
   */
  setStaytime(staytime) {
    this.staytime = staytime;
  }

  /**
   * Sets the fadeout time
   * @param {Number} fadeout
   */
  setFadeout(fadeout) {
    this.fadeouttime = fadeout;
  }

  /**
   * Returns the title type
   * @returns {Titles} The title type
   */
  getType() {
    return this.type;
  }

  /**
   * Returns the title text
   * @returns {string} The title text
   */
  getText() {
    return this.text;
  }

  /**
   * Returns the fade in time
   * @returns The fade in time
   */
  getFadeinTime() {
    return this.fadeintime;
  }

  /**
   * Returns the stay time
   * @returns The stay time
   */
  getStayTime() {
    return this.staytime;
  }

  /**
   * Returns the fade out time
   * @returns The fade out time
   */
  getFadeoutTime() {
    return this.fadeouttime;
  }

  send(client) {
    const titlepk = new Title();
    titlepk.setFadeinTime(this.getFadeinTime());
    titlepk.setStayTime(this.getStayTime());
    titlepk.setText(this.getText());
    titlepk.setType(this.getType());
    titlepk.setFadeoutTime(this.getFadeoutTime());
    titlepk.send(client);
  }
}

module.exports = Title;
