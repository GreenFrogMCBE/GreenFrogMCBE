declare module "FailedToHandleEvent" {
    export function handleEventError(
        e: Error,
        plugin: string,
        name: string
    ): void;
}