export = ModalForm;
declare class ModalForm {
    /**
     * @type {FormTypes}
     *
     * @type {import("./FormTypes")}
     */
    title: {
        readonly FORM: "form";
        readonly CUSTOMFORM: "custom_form";
        readonly MODALFORM: "modal";
    };
    /**
     * @type {string}
     */
    text: string;
    /**
     * @type {string}
     */
    button1: string;
    /**
     * @type {string}
     */
    button2: string;
    /**
     * @type {number}
     */
    id: number;
    /**
     * @type {function}
     *
     * @param {ModalForm} form
     * @param {Client} client
     */
    onSend: Function;
    /**
     * Sends the modal form to the specified client.
     *
     * @param {Client} client
     */
    send(client: Client): void;
}
