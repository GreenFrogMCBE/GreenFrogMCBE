const { exec } = require('node:child_process');

async function loadBP() {
    try {
        require('bedrock-protocol')
    } catch (e) {
        console.log(`Error: No bedrock-protocol found! Installing...`)
        await exec(`npm i bedrock-protocol`, () => { });
    }
}

if (process.platform === 'win32') {
    exec(`powershell /c CheckNetIsolation LoopbackExempt -a -n=Microsoft.MinecraftUWP_8wekyb3d8bbwe`, () => { });
}

require('./src/Server.js')