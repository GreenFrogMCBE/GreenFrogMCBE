interface ServerData {
    minorServerVersion: string;
    majorServerVersion: string;
    apiServerVersion: string;
}

function getServerData(): ServerData {
    return {
        minorServerVersion: "3.1 (API rewrite)",
        majorServerVersion: "3.0",
        apiServerVersion: "3.0"
    };
}