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
const PacketHandlingError = require("../exceptions/PacketHandlingError");
const PlayerCommandExecuteEvent = require("../../../plugin/events/PlayerCommandExecuteEvent")
const { lang, config } = require("../../../server/ServerInfo");

class CommandRequest extends require("./Handler") {
  validate(cmd) {
    if (!cmd) throw new PacketHandlingError(lang.missingcommand);

    if (!cmd.trim().length) throw new PacketHandlingError(lang.wsonly);

    if (cmd.length > 256) throw new PacketHandlingError(lang.cmdtoolong);
  }

  handle(client, packet) {
    if (config.commandsDisabled) return;
    let cmd = packet.data.params.command;
    this.validate(cmd);
    new PlayerCommandExecuteEvent().execute(require("../../../Server").server, client, cmd)
  }
}

module.exports = CommandRequest;
