const commandList = ["about", "navigate", "external", "help", "ed", "nano"];

export function commandCompletion(input: string): string[] {
    if (input === "") return [];
    const candidates = commandList.filter((cmd) => cmd.substring(0, input.length) === input);
    return candidates;
}