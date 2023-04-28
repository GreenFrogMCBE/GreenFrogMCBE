export interface ServerData {
    minorServerVersion: string;
    majorServerVersion: string;
    apiVersion: string;
}

declare function getServerData(): ServerData;