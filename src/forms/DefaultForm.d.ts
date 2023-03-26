export = Form;
declare class Form {
    type: string;
    title: string;
    buttons: {};
    id: number;
    text: {};
    send(client: any): void;
}
