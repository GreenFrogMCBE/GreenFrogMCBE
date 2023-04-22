declare module "Block" {
    interface Block {
        getRuntimeId(): number;
        getName(): string;
    }

    const Block: Block;
    export = Block;
}