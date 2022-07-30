import type { ContentList } from "../content/types";
import { printSyntax, commandList } from "./definitions";
import { CommandInterfaceCallbacks } from "./types";

export class CommandInterface {
    callbacks?: CommandInterfaceCallbacks;
    content: ContentList = [];

    constructor(callbacks?: CommandInterfaceCallbacks, content?: ContentList) {
        this.callbacks = callbacks;
        this.content = content || [];
    }

    static commandCompletion(input: string): string[] {
        if (input === "") return [];
        const candidates = commandList.filter(cmd => !cmd.hidden && cmd.name.startsWith(input)).map(cmd => cmd.name);
        return candidates;
    }

    executeCommand(command: string): string[] {
        if (!command) return [`$ ${command}`].concat(this.illegalCommand(command));
        const args = command.split(" ");
        const cmd = commandList.find(cmd => cmd.name === args[0]);
        if (!cmd) return [`$ ${command}`].concat(this.illegalCommand(command));
    
        const parsed = this.seperateFlags(args.splice(1));
        const result = parsed.flags.includes("--help") || parsed.flags.includes("-?") ? printSyntax(cmd) : cmd.execute(parsed.flags, parsed.subcmds, command, this);
    
        return [`$ ${command}`].concat(result);
    }

    private seperateFlags(args: string[]): {flags: string[], subcmds: string[]} {
        const flags = args.filter(arg => arg.substring(0,1) === "-");
        const subcmds = args.filter(arg => arg.substring(0,1) !== "-");
        return {flags, subcmds};
    }

    private illegalCommand(command: string): string[] {
        return [`Command '${command}' not found.`, "Type 'help' for help."];
    }
}