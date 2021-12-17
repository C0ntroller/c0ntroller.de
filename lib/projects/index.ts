import type { Project } from "./types";

const projectList: Project[] = [
    {
        name: "homepage",
        short: "This website.",
        desc: [
            "This is my homepage.",
            "What you see here should resemble an CLI. If you ever used Linux this should be pretty easy for you.",
            "Everyone else: Have no fear. It is pretty simple. You just type in commands and the output is shown here or it does something on the webite.",
            "To find out, which commands are available, you can type just 'help'.",
            "",
            "Currently everything is still in development. So if you come back in a few days/weeks/months/years something could have been changed!",
            "",
            "Have fun!"
        ],
        repo: "https://git.c0ntroller.de/c0ntroller/frontpage"
    }
];

export default projectList;