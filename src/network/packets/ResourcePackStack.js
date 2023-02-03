
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
class ResourcePackStack extends require("./Packet") {
  name() {
    return "resource_pack_stack";
  }

  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  writePacket(
    client,
    must_accept = false,
    behavior_packs = [],
    resource_packs = [],
    game_version = "",
    experiments = [],
    experiments_previously_used = false
  ) {
    this.validate(client);
    client.write(this.name(), {
      must_accept: must_accept,
      behavior_packs: behavior_packs,
      resource_packs: resource_packs,
      game_version: game_version,
      experiments: experiments,
      experiments_previously_used: false,
    });
  }
}

module.exports = ResourcePackStack;
