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
import Server from "../Server";
import { Client } from "frog-protocol";

interface Plugin {
	onLoad(): void;
	onShutdown(): void;
	onLoad(): void;
	PlayerJoinEvent(server: Server, player: Client, event): void;
	PlayerLeaveEvent(server: Server, player: Client, event): void;
	PlayerHasNoResourcePacksInstalledEvent(server: Server, player: Client, event): void;
	onResourcePacksRefused(server: Server, player: Client, event): void;
	onPlayerHaveAllPacks(server: Server, player: Client, event): void;
	onResourcePacksCompleted(server: Server, player: Client, event): void;
	PlayerKickEvent(server: Server, player: Client, msg: string, event): void;
	PlayerSpawnEvent(server: Server, player: Client, event): void;
	PlayerChatEvent(server: Server, player: Client, msg: string, event): void;
	PlayerCommandExecuteEvent(server: Server, player: Client, cmd: string, event): void;
	ServerConsoleCommandExecutedEvent(server: Server, player: Client, event): void;
	ServerInternalServerErrorEvent(server: Server, player: Client, error: string, event): void;
	PlayerMoveEvent(server: Server, player: Client, location: string, event): void;
	PlayerGamemodeChangeEvent(server: Server, player: Client, gamemode: string, event): void;
	ServerToClientChat(server: Server, player: Client, msg: string, event): void;
	ServerToastRequest(player: Client, server: Server, title: string, msg: string, event);
	PlayerTransferEvent(player: Client, server: Server, address: string, port: number, event);
	PlayerFormResponseEventPlayerMoveEvent(server: Server, player: Client, packet: object, event): void;
	BlockBreakEvent(server: Server, player: Client, data: object);
}

export default Plugin;
