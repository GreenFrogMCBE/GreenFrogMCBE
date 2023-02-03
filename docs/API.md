## GreenFrog API

### Plugin structure

```javascript
const BasePlugin = require("../src/plugins/BasePlugin");

class YourPlugin extends BasePlugin {

    constructor() { }

    getName() { return "YourPlugin"; }
    getVersion() { return "1.0"; }

    onLoad() {
        // ...
    }

}

module.exports = YourPlugin;
```

### Log levels

Log levels are:

1. Debug
2. Info
3. Warning / warn
4. Error / err

### Printing "Hello World" into console

```javascript
const Colors = require("../src/player/Colors");
const ColorsConsole = require("../src/server/Colors");
const BasePlugin = require("../src/plugins/BasePlugin");
const Log = require("../src/server/Logger");
const Logger = new Log()

class YourPlugin extends BasePlugin {
    constructor() { }

    getName() { return "YourPlugin"; }
    getVersion() { return "1.0"; }

    onLoad() { Logger.log("message", "info");}
}

module.exports = YourPlugin;
```

### Colors

Here is an basic example of using colors:

```javascript
const Colors = require("../src/player/Colors");
const ColorsConsole = require("../src/server/Colors");
const BasePlugin = require("../src/plugins/BasePlugin");
const Log = require("../src/server/Logger");
const Logger = new Log()

class YourPlugin extends BasePlugin {
    constructor() { }

    getName() { return "YourPlugin"; }
    getVersion() { return "1.0"; }

    onLoad() {
        Logger.log(ColorsConsole.CONSOLE_GREEN + "Hi")
    }

    onJoin(server, player) {
        player.sendMessage(Colors.red + "Hello World"); // Player color demo
    }
}

module.exports = YourPlugin;
```

#### Color list for player:

```javascript
black: "§0"
dark_blue: "§1"
dark_green: "§2"
dark_aqua: "§3"
dark_red: "§4"
dark_purple: "§5"
gold: "§6"
gray: "§7"
dark_gray: "§8"
blue: "§9"
green: "§a"
red: "§c"
light_purple: "§d"
yellow: "§e"
white: "§f"
obfuscated: "§k"
bold: "§l"
italic: "§o"
reset: "§r"
char: "§"
```

#### Colors for console

```javascript
CONSOLE_RESET: "\x1b[0m",
CONSOLE_BLUE: "\x1b[34m",
CONSOLE_YELLOW: "\x1b[33m",
CONSOLE_RED: "\x1b[31m",
CONSOLE_GREEN: "\x1b[32m",
```

### Kicking player

Here is an simple example how to kick a player when he joins the server

```javascript
const BasePlugin = require("../src/plugins/BasePlugin");

class YourPlugin extends BasePlugin {

    constructor() { }

    getName() { return "YourPlugin"; }
    getVersion() { return "1.0"; }

    onLoad() {
        // ...
    }

    onJoin(server, player) {
        player.kick("hi")
    }

}

module.exports = YourPlugin;
```
