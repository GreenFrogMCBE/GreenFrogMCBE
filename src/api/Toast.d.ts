export = Toast;
declare class Toast {
    title: string;
    message: string;
    /**
     * Sets the title.
     * @param {String} title
     */
    setTitle(title: string): void;
    /**
     * Sets the message.
     * @param {String} message
     */
    setMessage(message: string): void;
    /**
     * Sends the toast
     * @param {any} client
     */
    send(player: any): void;
}
