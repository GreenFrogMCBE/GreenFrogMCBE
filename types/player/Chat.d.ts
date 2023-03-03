declare const players: Array<{ sendMessage(msg: string): void }>;

declare module "broadcast" {
  export function broadcastMessage(msg?: string): void;
}