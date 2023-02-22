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
const TextTypes = require("./types/TextTypes");

let message = "";
let type = TextTypes.ANNOUNCEMENT;
let needs_translation = false;
let source_name = "";
let xuid = "";
let platform_chat_id = "";

class Text extends require("./Packet") {
  name() {
    return "text";
  }

  /**
   * Sets the message to be sent
   * @param {String} message Message to be sent
   */
  setMessage(message1) {
    message = message1;
  }

  /**
   * Sets the type
   * @param {String} type1 The type
   */
  setType(type1) {
    type = type1;
  }

  /**
   * Sets the needs translation
   * @param {boolean} needs_translation1 Does the need translation need?
   */
  setNeedsTranslation(needs_translation1) {
    needs_translation = needs_translation1;
  }

  /**
   * Sets the source name
   * @param {String} source_name1 The source name
   */
  setSourceName(source_name1) {
    source_name = source_name1;
  }

  /**
   * Sets the xuid
   * @param {String} xuid1 The xuid
   */
  setXuid(xuid1) {
    xuid = xuid1;
  }

  /**
   * Sets the platform chat id
   * @param {String} platform_chat_id1 The platform chat id (default = "")
   */
  setPlatformChatId(platform_chat_id1) {
    platform_chat_id = platform_chat_id1;
  }

  /**
   * Returns the message
   * @returns The message to be sent
   */
  getMessage() {
    return message;
  }

  /**
   * Returns the chat message type
   * @returns The type
   */
  getType() {
    return type;
  }

  /**
   * Returns chat message needs translation field
   * @returns The needs translation
   */
  getNeedsTranslation() {
    return needs_translation;
  }

  /**
   * Returns the source name
   * @returns The source name
   */
  getSourceName() {
    return source_name;
  }

  /**
   * Returns the XUID
   * @returns The XUID
   */
  getXuid() {
    return xuid;
  }

  /**
   * Returns the platform chat id
   * @returns The platform chat id
   */
  getPlatformChatId() {
    return platform_chat_id;
  }

  /**
   * @param {Object} client - The client that will receive the packet.
   * @param {String} [message] - The message to send.
   * @param {String} [type=announcement] - The type of message.
   * @param {Boolean} [needs_translation=false] - If true, the message will be translated to the client's language (if there is translation key).
   * @param {String} [source_name] - The name of the source of the message.
   * @param {String} [xuid] - The XUID of the player, who sent the message.
   * @param {String} [platform_chat_id] - This is the ID of the player you want to send the message to.
   */
  send(client) {
    client.write(this.name(), {
      type: this.getType(),
      needs_translation: this.getNeedsTranslation(),
      source_name: this.getSourceName(),
      message: this.getMessage(),
      xuid: this.getXuid(),
      platform_chat_id: this.getPlatformChatId(),
    });
  }
}

module.exports = Text;
