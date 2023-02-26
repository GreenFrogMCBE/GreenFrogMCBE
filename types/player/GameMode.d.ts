export const GameModes = {
    CREATIVE: "creative",
    SURVIVAL: "survival",
    SPECTATOR: "spectator",
    ADVENTURE: "adventure",
    FALLBACK: "fallback",
} as const;

export type GameMode = typeof GameModes[keyof typeof GameModes];
