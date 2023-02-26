declare module "eventUtils" {
    export function handleEventError(
        e: Error,
        plugin: string,
        name: string
    ): void;
}

declare const eventUtils: {
    handleEventError: (e: Error, plugin: string, name: string) => void;
};

export default eventUtils;