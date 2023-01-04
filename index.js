const { exec } = require('node:child_process');
if (process.platform === 'win32') {
    exec(`powershell /c CheckNetIsolation LoopbackExempt -a -n=Microsoft.MinecraftUWP_8wekyb3d8bbwe`, () => {});
}

require('./src/Server.js')