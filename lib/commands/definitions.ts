import type { Command, Flag } from "./types";

function getCommandByName(name: string): Command|undefined {
    return commandList.find(cmd => cmd.name === name);
}

function illegalUse(raw: string, cmd: Command): string[] {
    return [
        "Syntax error!",
        `Cannot parse "${raw}"`,
        ""
    ].concat(printSyntax(cmd));
}

function checkFlags(flags: string[], cmd: Command): boolean {
    if (!flags || flags === []) return true;
    if (!cmd.flags) return false;

    for (const flag of flags) {
        const isLong = flag.substring(0,2) === "--";
        const flagObj = cmd.flags.find(f => isLong ? f.long === flag.substring(2) : f.short === flag.substring(1));
        if (!flagObj) return false;
    }
    return true;
}

function checkSubcmd(subcmds: string[], cmd: Command): boolean {
    if (!subcmds || subcmds === []) return true;
    if (!cmd.subcommands) return false;

    for (const sc of subcmds) {
        const flagObj = cmd.subcommands.find(s => s.name === sc);
        if (!flagObj) return false;
    }
    return true;
}

function checkFlagInclude(flagsProvided: string[], flag: Flag): boolean {
    return flagsProvided.includes(`-${flag.short}`) || flagsProvided.includes(`--${flag.long}`);
}

export function printSyntax(cmd: Command): string[] {
    let flagsOption = "";
    let flagsDesc = [];
    if (cmd.flags && cmd.flags.length > 0) {
        flagsOption = " [";
        flagsDesc.push("");
        flagsDesc.push("Flags:");
        cmd.flags.forEach((flag => {
            flagsOption += `-${flag.short} `;
            flagsDesc.push(`\t-${flag.short}\t--${flag.long}\t${flag.desc}`);
        }));
        flagsOption = flagsOption.substring(0, flagsOption.length-1) + "]";
    }

    let subcmdOption = "";
    let subcmdDesc = [];
    if (cmd.subcommands && cmd.subcommands.length > 0) {
        subcmdOption = " [";
        subcmdDesc.push("");
        subcmdDesc.push("Arguments:");
        cmd.subcommands.forEach((subcmd => {
            subcmdOption += `${subcmd.name}|`;
            subcmdDesc.push(`\t${subcmd.name}\t\t${subcmd.desc}`);
        }));
        subcmdOption = subcmdOption.substring(0, subcmdOption.length-1) + "]";
    }

    return [`Usage: ${cmd.name}${flagsOption}${subcmdOption}`].concat(flagsDesc).concat(subcmdDesc);   
}

const about: Command = {
    name: "about",
    desc: "Show information about this page.",
    execute: (_flags, _args, _raw) => {
        return [
            "Hello there wanderer.",
            "So you want to know what this is about?",
            "",
            "Well, the answer is pretty unspectecular:",
            "This site presents some stuff that the user named C0ntroller created.",
            "If you wander arround you will find various projects.",
            "",
            "The navigation is done via this console interface.",
            "Even when you open a project page you don't need your mouse - just press Esc to close it.",
            "",
            "I hope you enjoy your stay here!",
            "If you wanted more information about the page itself, type 'project this'."
        ];
    }
};

const help: Command = {
    name: "help",
    desc: "Shows helptext.",
    flags: [{ long: "more", short: "m", desc: "Show more information." }],
    execute: (flags, _args, _raw) => {
        checkFlags(flags, help);
        if (help.flags && checkFlagInclude(flags, help.flags[0])) {
            return [
                "Hello user!",
                "What you see here should resemble an CLI. If you ever used Linux this should be pretty easy for you.",
                "Everyone else: Have no fear. It is pretty simple. You just type in commands and the output is shown here or it does something on the webite.",
                "To find out, which commands are available, you can type just 'help'.",
                "",
                "Have fun!"
            ];
        } else {
            const available = ["Available commands:"];
            commandList.forEach(cmd => available.push(`\t${cmd.name}\t${cmd.desc}`));
            available.concat([
                "",
                "Need more help? Type 'help -m'!"
            ]);
            return available;
        }
    }
};

const man: Command = {
    name: "man",
    desc: "Provides a manual for a command.",
    subcommands: [{name: "command", desc: "Name of a command"}],
    execute: (_flags, args, _raw) => {
        if (args.length !== 1) {
            return printSyntax(man);
        } else {
            const cmd = getCommandByName(args[0]);
            if (!cmd) return [`Cannot find command '${args[0]}'.`];
            else return printSyntax(cmd);
        }
    }
};

export const commandList = [about, help, man];