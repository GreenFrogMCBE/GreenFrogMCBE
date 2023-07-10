declare interface PluginBase {
	onLoad(): any
	onShutdown(): any
	PlayerConnectionCreateEvent(event: any): any
	PlayerLeaveEvent(): any
	PlayerHasNoResourcePacksInstalledEvent(event: any): any
	PlayerResourcePacksRefusedEvent(event: any): any
	PlayerHasAllResourcePacksEvent(event: any): any
	PlayerResourcePacksCompletedEvent(event: any): any
	PlayerKickEvent(event: any): any
	PlayerSpawnEvent(event: any): any
	PlayerChatEvent(event: any): any
	PlayerCommandExecuteEvent(event: any): any
	PlayerMoveEvent(event: any): any
	PlayerTransferEvent(event: any): any
	PlayerFormResponseEvent(event: any): any
	PlayerGamemodeChangeRequestEvent(event: any): any
	ServerToClientChat(event: any): any
	ServerToastRequest(event: any): any
	ServerConsoleCommandExecutedEvent(event: any): any
	ServerInternalServerErrorEvent(event: any): any
}

export declare abstract class PluginBase {}
