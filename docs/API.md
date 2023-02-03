## GreenFrog API

### Plugin structure

`const BasePlugin = require("../src/plugins/BasePlugin");

class YourPlugin extends BasePlugin {
constructor() { }

    getName() { return "YourPlugin"; }
    getVersion() { return "1.0"; }

    onLoad() {
        // ...
    }

}

module.exports = YourPlugin;`

### Log levels

Log levels are:

1. Debug
2. Info
3. Warn / Warning
4. Err / Error

### Printing "Hello World" into console

const Log = require("../src/server/Logger");
const Logger = new Log()

Logger.log(
"message", // Message
"info", // Log level. Info by default
)

### Colors

Here is an basic example of using this:

const Colors = require("../src/player/Colors");
const BasePlugin = require("../src/plugins/BasePlugin");

class YourPlugin extends BasePlugin {
constructor() { }

    getName() { return "YourPlugin"; }
    getVersion() { return "1.0"; }

    onLoad() {
        // ...
    }

    onJoin(server, player) {
        player.sendMessage(Colors.red + "Hello World");
    }

}

module.exports = YourPlugin;

### Kicking player on join

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

### Client.kick syntax

client.kick("message")
