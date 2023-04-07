export = ModalForm;
declare class ModalForm {
    title: string;
    text: string;
    button1: string;
    button2: string;
    id: number;
    /**
     * Sends the form to the client
     * @param {Object} client
     */
    send(client: any): void;
}
