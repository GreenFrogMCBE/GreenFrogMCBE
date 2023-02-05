const FormRequest = require("../network/packets/FormRequest")

class Form {
    constructor () {
        this.content = ""
        this.type = "form"
        this.title = ""
        this.buttons = []
        this.id = 0
    }

    setId(id) {
        this.id = id
    }

    setTitle(title) {
        this.title = title
    }

    setContent(content) {
        this.content = content
    }

    setButtons(buttons) {
        this.buttons = buttons
    }

    send(client) {
        const FormReq = new FormRequest()
        FormReq.setId(this.id)
        FormReq.setTitle(this.title)
        FormReq.setText(this.content)
        FormReq.setJsonButtons(this.buttons)
        FormReq.setType(this.type)
        FormReq.send(client)
    }
}

module.exports = Form