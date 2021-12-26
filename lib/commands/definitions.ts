import type { Command, Flag } from "./types";
import type { Project } from "../projects/types";
import projectList from "../projects";

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
        const flagObj = Object.values(cmd.flags).find(f => isLong ? f.long === flag.substring(2) : f.short === flag.substring(1));
        if (!flagObj) return false;
    }
    return true;
}

function checkSubcmd(subcmds: string[], cmd: Command): boolean {
    if (!subcmds || subcmds === []) return true;
    if (!cmd.subcommands) return false;

    for (const sc of subcmds) {
        const flagObj = Object.values(cmd.subcommands).find(s => s.name === sc);
        if (!flagObj) return false;
    }
    return true;
}

function checkFlagInclude(flagsProvided: string[], flag: Flag): boolean {
    if (!flag) return false;
    return flagsProvided.includes(`-${flag.short}`) || flagsProvided.includes(`--${flag.long}`);
}

export function printSyntax(cmd: Command): string[] {
    let flagsOption = "";
    let flagsDesc = [];
    if (cmd.flags && Object.keys(cmd.flags).length > 0) {
        flagsOption = " [";
        flagsDesc.push("");
        flagsDesc.push("Flags:");
        Object.values(cmd.flags).forEach((flag => {
            flagsOption += `-${flag.short} `;
            flagsDesc.push(`\t-${flag.short}\t--${flag.long}\t${flag.desc}`);
        }));
        flagsOption = flagsOption.substring(0, flagsOption.length-1) + "]";
    }

    let subcmdOption = "";
    let subcmdDesc = [];
    if (cmd.subcommands && Object.keys(cmd.subcommands).length > 0) {
        subcmdOption = " [";
        subcmdDesc.push("");
        subcmdDesc.push("Arguments:");
        Object.values(cmd.subcommands).forEach((subcmd => {
            subcmdOption += `${subcmd.name}|`;
            subcmdDesc.push(`\t${subcmd.name}\t${subcmd.desc}`);
        }));
        subcmdOption = subcmdOption.substring(0, subcmdOption.length-1) + "]";
    }

    return [`Usage: ${cmd.name}${flagsOption}${subcmdOption}`].concat(flagsDesc).concat(subcmdDesc);   
}

const about: Command = {
    name: "about",
    desc: "Show information about this page.",
    execute: () => {
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
            "If you wanted more information about the page itself, type 'project this' or 'help -t'."
        ];
    }
};

const help: Command = {
    name: "help",
    desc: "Shows helptext.",
    flags: {more: { long: "this", short: "t", desc: "Show information about this site." }},
    execute: (flags) => {
        if (help.flags && checkFlagInclude(flags, help.flags.more)) {
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
    subcommands: {
        command: {name: "command", desc: "Name of a command"}
    },
    execute: (_flags, args) => {
        if (args.length !== 1) {
            return printSyntax(man);
        } else {
            const cmd = getCommandByName(args[0]);
            if (!cmd) return [`Cannot find command '${args[0]}'.`];
            else return printSyntax(cmd);
        }
    }
};

const project: Command = {
    name: "project",
    desc: "Show information about a project.",
    flags: {
        minimal: {short: "m", long: "minimal", desc: "Only show minimal information."},
        source: {short: "s", long: "source", desc: "Open git repository of project."},
        list: {short: "l", long: "list", desc: "Show list of projects."}
    },
    subcommands: {name: {name: "name", desc: "Name of the project."}},
    execute: (flags, args) => {
        if (project.flags && checkFlagInclude(flags, project.flags.list)) {
            const result = ["Found the following projects:"];
            projectList.forEach(project => result.push(`\t${project.name}\t${project.short}`));
            return result;
        }

        if (args.length !== 1) return printSyntax(project);

        if (args[0] === "this") args[0] = "homepage";

        const pjt = projectList.find(p => p.name === args[0]);
        if (!pjt) return [
            `Cannot find project ${args[0]}!`,
            "You can see available projects using 'project -l'."
        ];

        if (project.flags && checkFlagInclude(flags, project.flags.source)) {
            try {
                window && window.open(pjt.repo, "_blank");
                return ["Opened repository in new tab."];
            } catch {
                return ["Sorry, no repository for this project."];
            }
        }
        if (project.flags && checkFlagInclude(flags, project.flags.minimal)) return pjt.desc;

        // TODO
        // Open project page here.
        return [];
    }
};

const exitCmd: Command = {
    name: "exit",
    desc: "Tries to close this tab.",
    execute: () => {
        if (typeof window !== undefined) {
            window.opener = null;
            window.open('', '_self');
            window.close();
        }
        return [
            "If you can read this, closing the window did not work.",
            "This is most likely because of a restriction in JavaScript.",
            "#{Read more here|https://developer.mozilla.org/en-US/docs/Web/API/Window/close}."
        ]
    }
}

const clear: Command = {
    name: "clear",
    desc: "Clears the output on screen.",
    execute: () => []
}

export const commandList = [about, help, man, project, exitCmd, clear];