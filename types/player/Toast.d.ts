declare class Toast {
    title: string | null;
    message: string | null;

    setTitle(title: string): void
    setMessage(message: string): void
    send(client: any): void
}

export default Toast;