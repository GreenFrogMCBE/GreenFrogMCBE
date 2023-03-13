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
/* eslint-disable no-case-declarations */
const Logger = require("../../../server/Logger");
const { config, lang } = require("../../../api/ServerInfo");
const BlockBreakEvent = require("../../../events/BlockBreakEvent");
const Handler = require("./Handler");

class InventoryTransaction extends Handler {
	handle(server, client, packet) {
		let action = packet?.data?.params?.transaction?.transaction_data?.action_type || null;

		switch (action) {
			case "break_block":
				const breakevent = new BlockBreakEvent();
				breakevent.execute(server, client, packet.data.params.transaction);
				break;
			default:
				if (config.logUnhandledPackets) {
					Logger.debug(lang.devdebug.unhandledPacketData);
					console.log("%o", packet);
				}
				break;
		}
	}
}

module.exports = InventoryTransaction;
