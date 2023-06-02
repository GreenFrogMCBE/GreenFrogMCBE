export namespace data {
    const name: string;
    const description: string;
    const minArgs: number;
    const maxArgs: number;
    const requiresOp: boolean;
}
export function execute(_server: any, player: any, args: any): Promise<void>;
