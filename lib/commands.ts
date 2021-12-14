const commandList = ["about", "navigate", "external", "help", "ed", "nano"]

export function commandCompletion(input: string): string {
    if (input === "") return "";
    const candidates = commandList.map((cmd) => [cmd.substring(0, input.length), cmd]).filter((cmd) => cmd[0] === input);
    return candidates.length > 0 ? candidates[0][1] : "";
}