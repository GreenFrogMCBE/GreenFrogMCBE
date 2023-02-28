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
const TitlePacket = require("../network/packets/Title");
const Titles = require("../network/packets/types/Titles");

class Title {
  constructor() {
    this.type = Titles.TITLE;
    this.text = "";
    this.fadeintime = 0;
    this.fadeouttime = 0;
    this.staytime = 0;
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
   * @param {String} text
   */
  setText(text) {
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
  setStayTime(staytime) {
    this.staytime = staytime;
  }

  /**
   * Sets the fadeout time
   * @param {Number} fadeout
   */
  setFadeoutTime(fadeout) {
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
   * @returns {String} The title text
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
    const titlepk = new TitlePacket();
    titlepk.setFadeinTime(this.getFadeinTime());
    titlepk.setStaytime(this.getStayTime());
    titlepk.setText(this.getText());
    titlepk.setType(this.getType());
    titlepk.setFadeoutTime(this.getFadeoutTime());
    titlepk.send(client);
  }
}

module.exports = Title;
