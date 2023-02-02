/*
░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░


(c) 2023 andriycraft
*/
class ResponsePackInfo extends require("./Packet") {
  name() {
    return "resource_packs_info";
  }

  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  writePacket(
    client,
    must_accept = false,
    has_scripts = false,
    behavior_packs = [],
    texture_packs = []
  ) {
    this.validate(client);
    client.write(this.name(), {
      must_accept: must_accept,
      has_scripts: has_scripts,
      behaviour_packs: behavior_packs,
      texture_packs: texture_packs,
    });
  }
}

module.exports = ResponsePackInfo;
