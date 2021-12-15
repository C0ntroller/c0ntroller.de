import type { Command } from "./types";

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

export function printSyntax(cmd: Command): string[] {
    let flagsOption = "";
    let flagsDesc = [];
    if (cmd.flags && cmd.flags.length > 0) {
        flagsOption = " [";
        flagsDesc.push("Flags:");
        cmd.flags.forEach((flag => {
            flagsOption += `-${flag.short} `;
            flagsDesc.push(`\t-${flag.short}\t--${flag.long}\t${flag.desc}`);
        }));
        flagsOption = flagsOption.substring(0, flagsOption.length-1) + "]";
        flagsDesc.push("");
    }

    let subcmdOption = "";
    let subcmdDesc = [];
    if (cmd.subcommands && cmd.subcommands.length > 0) {
        subcmdOption = " [";
        subcmdDesc.push("Subcommands:");
        cmd.subcommands.forEach((subcmd => {
            subcmdOption += `${subcmd.name}|`;
            subcmdDesc.push(`\t${subcmd.name}\t${subcmd.desc}`);
        }));
        subcmdOption = subcmdOption.substring(0, subcmdOption.length-1) + "]";
        subcmdDesc.push("");
    }

    return [`Usage: ${cmd.name}${flagsOption}${subcmdOption}`, ""].concat(flagsDesc).concat(subcmdDesc);   
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

export const commandList = [about];