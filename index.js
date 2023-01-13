const { exec } = require('node:child_process');

async function loadBP() {
    try {
        require('bedrock-protocol')
    } catch (e) {
        console.log(`Error: No bedrock-protocol found! Installing...`)
        await exec(`npm i bedrock-protocol`, () => { });
    }
}

require('./src/Server.js')