export interface ServerData {
    minorServerVersion: string;
    majorServerVersion: string;
    apiServerVersion: string;
}

declare function getServerData(): ServerData;