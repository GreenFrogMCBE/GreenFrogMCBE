const bedrock = require('frog-protocol')


module.exports = {
    test() {
        bedrock.createClient({
            host: '127.0.0.1',
            port: 19132,
            username: 'bot',
            offline: true
        })
    }
}