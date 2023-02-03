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
3. Warning // warn
4. Error / err

### Printing "Hello World" into console

```javascript
const Log = require("../src/server/Logger");
const Logger = new Log()

Logger.log(
    "message", // Message
    "info", // Log level. (info by default)
)
```

### Colors

Here is an basic example of using colors:

```javascript
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
