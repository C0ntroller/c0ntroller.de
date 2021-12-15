interface Flag {
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
    flags?: Flag[];
    subcommands?: SubCommand[];
    execute: (flags: string[], args: string[], raw: string) => string[];
}
