import Color from "color";

export function getColors() {
    const replColor = window.document.documentElement.style.getPropertyValue("--repl_color") || window.getComputedStyle(document.documentElement).getPropertyValue("--repl_color") || "rgb(24, 138, 24)";
    const linkColor = window.document.documentElement.style.getPropertyValue("--repl_color-link") || window.getComputedStyle(document.documentElement).getPropertyValue("--repl_color-link") || "rgb(31, 179, 31)";
    const hintColor = window.document.documentElement.style.getPropertyValue("--repl_color-hint") || window.getComputedStyle(document.documentElement).getPropertyValue("--repl_color-hint") || "rgba(24, 138, 24, 0.3)";
    return [replColor, linkColor, hintColor];
};

export function setColors(color: Color) {
    window?.document.documentElement.style.setProperty("--repl_color", color.string());
    window?.document.documentElement.style.setProperty("--repl_color-link", color.lighten(0.3).rgb().string());
    window?.document.documentElement.style.setProperty("--repl_color-hint", color.fade(0.7).string());
};

export class Rainbow {
    color: Color;
    step: number = 5;
    runner: any = undefined;

    constructor() {
        this.color = new Color("hsl(0, 100%, 50%)");
    }

    next() {;
        this.color = this.color.rotate(this.step);
        setColors(this.color);
    }

    start() {
        this.runner = setInterval(() => this.next(), 100);
    }

    stop() {
        clearInterval(this.runner);
        this.runner = undefined;
    }
}

export default new Rainbow();