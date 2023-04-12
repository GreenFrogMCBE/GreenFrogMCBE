declare module "Block" {
    import { IBlock } from "../block/Block";

    interface Block extends IBlock {
        getRuntimeId(): number;
        getName(): string;
    }

    const Block: Block;
    export = Block;
}
