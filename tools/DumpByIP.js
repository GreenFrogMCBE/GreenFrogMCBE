const { Relay } = require('frog-protocol')
const fs = require('fs')
function serialize(obj = {}, fmt) {
    return JSON.stringify(obj, (k, v) => typeof v === 'bigint' ? v.toString() : v, fmt)
}

// Start the proxy server
const relay = new Relay({
    version: '1.19.50',
    host: '0.0.0.0',
    port: 19132,
    destination: {
        host: process.argv[3],
        port: process.argv[4]
    }
})
relay.conLog = console.debug
relay.listen()

relay.on('connect', player => {
    console.log('New connection', player.connection.address)

    player.on('clientbound', ({ name, params }) => {
        if (name == 'level_chunk') return
        console.log(`${name}.json`, serialize(params, 2))
    })
})
