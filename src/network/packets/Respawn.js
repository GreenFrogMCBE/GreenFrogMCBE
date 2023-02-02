/*
░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░


(c) 2023 andriycraft
*/
class Respawn extends require("./Packet") {
  name() {
    return "respawn";
  }

  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  writePacket(client) {
    this.validate(client);
    client.write(this.name(), {
      position: {
        x: 0.5,
        y: 100,
        z: 0.5,
      },
      state: 1,
      runtime_entity_id: "0",
    });
  }
}

module.exports = Respawn;
