const Events = require("../../../server/Events");

class ModalFormResponse extends require("./Handler") {
  handle(server, client, packet) {
    new Events().executeFR(server, client, packet);
  }
}

module.exports = ModalFormResponse;
