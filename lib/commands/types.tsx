import type { CommandInterface } from ".";
import type { Diary, Project } from "../content/types";

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
    execute: (flags: string[], args: string[], raw: string, cmdIf: CommandInterface) => string[];
}

export interface CommandInterfaceCallbacks {
    setModalVisible?: (visible: boolean) => void; 
    setModalContent?: (content: Project | Diary, selectedPage?: number) => void;
    setModalHTML?: (html: any) => void;
    getCmdHistory?: () => string[];
}