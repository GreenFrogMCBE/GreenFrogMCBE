/* eslint-disable no-case-declarations */
const BlockBreakEvent = require("../../../plugin/events/BlockBreakEvent");
const Logger = require("../../../server/Logger");
const LogTypes = require("../../../server/LogTypes");
const { config, lang } = require("../../../server/ServerInfo")
const Handler = require("./Handler");

class InventoryTransaction extends Handler {
    handle(server, client, packet) {
        let action
        try {
            action = packet.data.params.transaction.transaction_data.action_type
        } catch (e) {
            action = null
        }
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
                    Logger.log(lang.devdebug.unhandledPacketData, LogTypes.DEBUG);
                    console.log("%o", packet);
                }
                break
        }
    }
}

module.exports = InventoryTransaction;