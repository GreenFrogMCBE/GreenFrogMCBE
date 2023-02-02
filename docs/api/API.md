# API

This file is a tutorial for plugin devs

# BasePlugin.js

Your plugin must extend BasePlugin.js!

`const BasePlugin = require("../src/plugins/BasePlugin");`

`class YourPlugin extends BasePlugin { .. }`

# Plugin structure

Example here: https://gist.github.com/andriycraft/b172c760b0bce87a8a53d45d08291da0

# Logging

#### TIP: Never use console.log()

#### TIP: Do not use Logger.prototype.Log() - use Logger.prototype.pluginLog()

### Logger.prototype.pluginLog() syntax:

`Logger.prototype.pluginLog('LOG_LEVEL', 'PLUGINNAME', 'MESSAGE', 'PREFIX_OPTIONAL', 'SUFFIX_OPTINAL')`

`LOG_LEVEL field is for log level (like error, info, warn, etc)`

`PLUGINNAME field is for plugin name. To get plugin name use this.getName()`

`MESSAGE is for message`

`PREFIX_OPTIONAL is for prefix for plugin name. This is optional - If this field is null the prefix will be set to empty string`

`SUFFIX_OPTIONAL is for suffix for plugin name. This is optional - If this field is null the prefix will be set to empty string`

### Prefixes and suffixes

For example: You set prefix and suffix to |

This will look like this in console:
`INFO | |PLUGIN_NAME|`

The formatting is `INFO | [PREFIX][PLUGINNAME][SUFFIX]`

### Log levels

There are a few log levels:

- info - For info
- warn - For warnings
- warning - Same as warn
- error - For errors
- err - Same as error
- debug - For debug. Will work only if debug is enabled in config.json

# Chat

### Sending messages

Example 1: - Sending message to player

`const Chatmessage = require("../src/player/Chatmessage");`

`Chatmessage.prototype.sendMessage(client, "This message was sent using GFMCBE API!")`

Example 2: - Broadcast

`const Chatmessage = require("../src/player/Chatmessage");`

`Chatmessage.prototype.broadcastMessage("This is broadcast")`

Example 3: - Chat message with colors

`const Chatmessage = require("../src/player/Chatmessage");`
`const Colors = require("../src/chat/Colors");`

`Chatmessage.prototype.broadcastMessage(Colors.black + "This is broadcast")`

### Chat colors:

There are a few that GreenfrogMCBE supports:

`black: "§0",
dark_blue: "§1",
dark_green: "§2",
dark_aqua: "§3",
dark_red: "§4",
dark_purple: "§5",
gold: "§6",
gray: "§7",
dark_gray: "§8",
blue: "§9",
green: "§a",
red: "§c",
light_purple: "§d",
yellow: "§e",
white: "§f",
obfuscated: "§k",
cursed: "§k",
bold: "§l",
italic: "§o",
reset: "§r",
char: "§"`
