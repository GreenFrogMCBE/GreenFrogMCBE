/*
░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░


(c) 2023 andriycraft
*/
/* It's a class that contains all the functions that a plugin can use. */
class BasePlugin {
  constructor() {}

  onLoad() {}
  onShutdown() {}
  onJoin() {}
  onResourcePackInfoSent() {}
  onPlayerHasNoResourcePacksInstalled() {}
  onResourcePacksRefused() {}
  onPlayerHaveAllPacks() {}
  onResourcePacksCompleted() {}
  onKick() {}
  onPlayerSpawn() {}
  onChat() {}
  onCommand() {}
  onConsoleCommand() {}
  onInternalServerError() {}
  onLeave() {}
  onPlayerMove() {}
  onGamemodeChange() {}
  onServerToClientChat() {}
  onToast() {}
  onTransfer() {}
  onFormResponse() {}
}

module.exports = BasePlugin;
