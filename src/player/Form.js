const FormRequest = require("../network/packets/FormRequest")

class Form {
    constructor () {
        this.content = ""
        this.type = "form"
        this.title = ""
        this.buttons = []
        this.id = 0
    }

    /**
     * Sends the form to the client
     * @param client
     */
    send(client) {
        const FormReq = new FormRequest()
        FormReq.setId(this.id)
        FormReq.setTitle(this.title)
        FormReq.setText(this.content)
        FormReq.setButtons(JSON.stringify(this.buttons))
        FormReq.setType(this.type)
        FormReq.send(client)
    }
}

module.exports = Form