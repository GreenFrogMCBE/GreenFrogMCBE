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
const fs = require("fs");
const lang = require("../server/ServerInfo").lang;
const Logger = require("../server/Logger");

module.exports = {
  /**
   * It executes a function in every plugin
   * @param server - The server object
   * @param client - The client that has no resource packs installed.
   */
  executePHNRPI(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onPlayerHasNoResourcePacksInstalled(
            server,
            client
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onPlayerHasNoRPSInstalled")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads the plugins folder, and then executes the onResourcePacksRefused function in each plugin
   * @param server - The server object
   * @param client - The client that refused the resource pack
   */
  executeFTEORPF(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onResourcePacksRefused(
            server,
            client
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onResourcePacksRefused")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads all the plugins in the plugins folder and executes the onPlayerHaveAllPacks function in
   * each plugin
   * @param server - The server object
   * @param client - The client object
   */
  executeFTEOPHAP(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onPlayerHaveAllPacks(
            server,
            client
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onPlayerHaveAllPacks")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads the plugins folder, and then executes the onResourcePacksCompleted function in each plugin
   * @param server - The server object
   * @param client - The client that sent the packet
   */
  executeFTEOK(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onResourcePacksCompleted(
            server,
            client
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onResourcePacksCompleted")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It executes a function in every plugin that has the function onLeave
   * @param server - The server object
   * @param client - The client that left the server
   */
  executeOL(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onLeave(
            server,
            client
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onLeave")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads all the plugins in the plugins folder and executes the onPlayerSpawn function in each
   * plugin
   * @param server - The server object
   * @param client - The client that spawned
   */
  executeOPS(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onPlayerSpawn(
            server,
            client
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onPlayerSpawn")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It executes a function in every plugin, and then executes the onJoin function in each plugin
   * @param server - The server object
   * @param client - The client that sent the packet
   */
  executeOJ(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onJoin(
            server,
            client
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onJoin")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads the plugins folder, and then executes the onInternalServerError function in each plugin
   * @param server - The server object
   * @param client - The client that sent the message
   * @param err - The error that was thrown
   */
  executeOISE(server, client, error) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onInternalServerError(
            server,
            client,
            error
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onInternalServerError")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads all the plugins in the plugins folder, and executes the onChat function in each plugin
   * @param server - The server object
   * @param client - The client that sent the message
   * @param msg - The message that the user sent
   * @param fullmsg - The full message that was sent.
   */
  executeOC(server, client, message) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onChat(
            server,
            client,
            message
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onChat")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It executes the onCommand function of every plugin
   * @param server - The server object
   * @param client - The client that sent the command
   * @param cmd - The command that was executed
   */
  executeOC2(server, client, cmd) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\plugins\\${plugin}`).onCommand(
            server,
            client,
            cmd
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onCommand")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It executes a function in every plugin that has the function onConsoleCommand
   * @param data - The data that was sent to the console.
   * @param server - The server object
   */
  executeOCC(data, server) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`../../plugins/${plugin}`).onConsoleCommand(
            data.toLowerCase(),
            server
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onConsoleCommand")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads the plugins folder, and then executes the onPlayerMove function in each plugin
   * @param client - The client object
   * @param server - The server object
   * @param location - The new location encoded as JSON
   */
  executePMV(client, server, location) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`../../plugins/${plugin}`).onPlayerMove(
            client,
            server,
            location
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onPlayerMove")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads the plugins folder, and then executes the onGamemodeChange function in each plugin
   * @param client - The client that changed their gamemode
   * @param server - The server object
   * @param gamemode - The gamemode the player is changing to.
   */
  executeGMC(client, server, gamemode) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`../../plugins/${plugin}`).onGamemodeChange(
            client,
            server,
            gamemode
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onGamemodeChange")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It executes the onServerToClientChat event for all plugins
   * @param client - The client that sent the message
   * @param server - The server object
   * @param msg - The message that was sent
   */
  executeSRVTOCLCH(client, server, msg) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`../../plugins/${plugin}`).onServerToClientChat(
            client,
            server,
            msg
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onServerToClientChat")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It reads all the plugins in the plugins folder and executes the onToast function in each plugin.
   * @param client - The client object
   * @param server - The server object
   * @param title - The title of the toast
   * @param msg - The message that was sent
   */
  executeOT(client, server, title, msg) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`../../plugins/${plugin}`).onToast(
            client,
            server,
            title,
            msg
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onToast")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  /**
   * It executes the onTransfer event for all plugins
   * @param client - The client that is being transferred
   * @param server - The server object
   * @param address - The IP address of the server you're transferring to.
   * @param port - The port the server is running on
   */
  executeTR(client, server, address, port) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`../../plugins/${plugin}`).onTransfer(
            client,
            server,
            address,
            port
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onTransfer")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },

  executeFR(client, server, packet) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`../../plugins/${plugin}`).onFormResponse(
            client,
            server,
            packet
          );
        } catch (e) {
          if (e.toString().startsWith(`TypeError: require(...)`) && e.toString().includes("is not a function")) return // Someone please rewrite the plugin system so we don't need to do this shit
          Logger.log(
            lang.failedToExecuteEvent
              .replace("%plugin%", plugin)
              .replace("%event%", "onFormResponse")
              .replace("%e%", e.stack),
            "error"
          );
        }
      });
    });
  },
}