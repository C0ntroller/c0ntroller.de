export interface Flag {
    short: string;
    long: string;
    desc: string;
}

interface SubCommand {
    name: string;
    desc: string;
}

export interface Command {
    name: string;
    hidden?: boolean;
    desc: string;
    flags?: Record<string,Flag>;
    subcommands?: Record<string,SubCommand>;
    execute: (flags: string[], args: string[], raw: string, extra?: any) => string[];
}
