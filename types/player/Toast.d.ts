declare class Toast {
    title: string | null;
    message: string | null;

    /**
     * Sets the title.
     * @param {String} title
     */
    setTitle(title: string): void

    /**
     * Sets the message.
     * @param {String} message
     */
    setMessage(message: string): void

    /**
     * Sends the toast
     * @param {Object} client
     */
    send(client: any): void
}

export default Toast;
