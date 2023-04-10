interface ReadLineInterface extends NodeJS.EventEmitter {
    setPrompt(prompt: string): void;
    prompt(preserveCursor?: boolean): void;
    question(query: string, callback: (answer: string) => void): void;
    close(): void;
    pause(): this;
    resume(): this;
    write(data: string | Buffer, key?: { name?: string, ctrl?: boolean, meta?: boolean, shift?: boolean }): void;
    on(event: 'close', listener: () => void): this;
    on(event: 'line', listener: (input: string) => void): this;
    on(event: 'pause', listener: () => void): this;
    on(event: 'resume', listener: () => void): this;
    on(event: 'SIGCONT', listener: () => void): this;
    on(event: 'SIGINT', listener: () => void): this;
    on(event: 'SIGTSTP', listener: () => void): this;
    on(event: 'SIGWINCH', listener: () => void): this;
}  