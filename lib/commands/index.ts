import { printSyntax, commandList } from "./definitions";

//const commandList = ["about", "navigate", "external", "help", "ed", "nano"];

export function commandCompletion(input: string): string[] {
    if (input === "") return [];
    const candidates = commandList.filter(cmd => cmd.name.substring(0, input.length) === input).map(cmd => cmd.name);
    return candidates;
}

export function executeCommand(command: string): string[] {
    if (!command) return [`$ ${command}`].concat(illegalCommand(command));
    const args = command.split(" ");
    const cmd = commandList.find(cmd => cmd.name === args[0]);
    if (!cmd) return [`$ ${command}`].concat(illegalCommand(command));

    const parsed = seperateFlags(args.splice(1));
    const result = parsed.flags.includes("--help") ? printSyntax(cmd) : cmd.execute(parsed.flags, parsed.subcmds, command);

    return [`$ ${command}`].concat(result);
}

function seperateFlags(args: string[]): {flags: string[], subcmds: string[]} {
    const flags = args.filter(arg => arg.substring(0,1) === "-");
    const subcmds = args.filter(arg => arg.substring(0,1) !== "-");
    return {flags, subcmds};
}

function illegalCommand(command: string): string[] {
    return [`Command '${command}' not found.`, "Type 'help' for help."];
}