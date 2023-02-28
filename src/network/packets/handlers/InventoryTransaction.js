/* eslint-disable no-case-declarations */
const BlockBreakEvent = require("../../../plugin/events/BlockBreakEvent");
const Logger = require("../../../server/Logger");
const { config, lang } = require("../../../server/ServerInfo")
const Handler = require("./Handler");

class InventoryTransaction extends Handler {
    handle(server, client, packet) {
        let action = packet.data.params.transaction.transaction_data.action_type
        switch (action) {
            case "break_block":
                const breakevent = new BlockBreakEvent()
                breakevent.execute(
                    server,
                    client,
                    packet.data.params.transaction
                )
                break
            default:
                if (config.logUnhandledPackets) {
                    Logger.log(lang.devdebug.unhandledPacketData, "debug");
                    console.log("%o", packet);
                }
                break
        }
    }
}

module.exports = InventoryTransaction;