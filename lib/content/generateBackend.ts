// This file is used to generate the HTML for the projects and diaries in the backend.
// We can use fs and stuff here.

import { Dirent, readdirSync } from "fs";
import { readFile } from "node:fs/promises";
import { resolve } from "path";
import { JSDOM } from "jsdom";
import type { Project, Diary } from "./types";
import asciidoctor from "asciidoctor";

// Code Highlighting
import hljs from "highlight.js";
import rust from "highlight.js/lib/languages/rust";
import bash from "highlight.js/lib/languages/shell";
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("console", bash);
hljs.registerLanguage("shell", bash);

interface APISuccess {
    type: "success";
    html: string;
    date: string;
    repoUrl: string;
}

interface APIError {
    type: "error";
    html: string;
}

export type APIReturn = APISuccess | APIError;

export const projectEmpty = "<div>Kein Projekt ausgewählt.</div>";
const projectNotFoundHtml = `<div class="${"error"}">Sorry! There is no data for this project. Please check back later to see if that changed!</div>`;
const projectServerErrorHtml = `<div class="${"error"}">Sorry! A server error happend when the project data was fetched!</div>`;

const ad = asciidoctor();

const listPath = resolve("./public", "content", "list.json");
const projectPath = resolve("./public", "content", "projects");
const diaryPath = resolve("./public", "content", "diaries");
// Error catching as this is evaluated at build time
let pf: Dirent[] = [];
let df: Dirent[] = [];
try { pf = readdirSync(projectPath, { withFileTypes: true }).filter((f) => f.isFile() && f.name.endsWith(".adoc")) }
catch {}
// As we need the diaries too, no filter here
try { df = readdirSync(diaryPath, { withFileTypes: true }) }
catch {}

const projectFiles = pf;
const diaryFiles = df;

export async function getContentList() {
    try {
        const list = await readFile(listPath, { encoding: "utf-8" });
        return JSON.parse(list);
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function generateContent(content: Project|Diary, selectedPage?: number, api: boolean = false): Promise<string|APIReturn> {
    if(!content) return api ? {type: "error", html: projectEmpty} : projectEmpty;

    switch (content.type) {
        case "project": return await generateProjectHTML(content, api);
        case "diary": return await generateDiaryHTML(content, selectedPage, api);
        default: return projectNotFoundHtml;
    } 
}

async function generateProjectHTML(project: Project, api: boolean = false): Promise<string|APIReturn> {
    // First we test if the file exist
    if(!projectFiles.find((f) => f.name === `${project.name}.adoc`)) return api ? { type: "error", html: projectNotFoundHtml } : projectNotFoundHtml;

    // Resolve the path
    const path = resolve(projectPath, `${project.name}.adoc`);

    try {
        // Read the file
        const rawAd = await readFile(path, { encoding: "utf-8" });

        // Correct the paths so that the images are loaded correctly
        const pathsCorrected = rawAd.replace(/(image[:]+)(.*\.[a-zA-Z]+)\[/g, "$1/content/projects/$2[");
        const adDoc = ad.load(pathsCorrected, { attributes: { showtitle: true } });

        // Convert to HTML
        const converted = adDoc.convert(adDoc).toString();

        // For the API we want the HTML and the date only
        if (api) return {
            type: "success",
            html: converted,
            date: new Date(adDoc.getAttribute("docdatetime")).toISOString(),
            repoUrl: `https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/${process.env.IS_DEV ? "dev" : "senpai"}/projects/${project.name}.adoc`,
        };

        // Return and add the footer
        return `${converted}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${new Date(adDoc.getAttribute("docdatetime")).toLocaleString()} | <a href="https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/${process.env.IS_DEV ? "dev" : "senpai"}/projects/${project.name}.adoc" target="_blank">Document source</a>
    </div>
</div>`;
    } catch (e) {
        // Something gone wrong
        console.error(e);
        return api ? { type: "error", html: projectServerErrorHtml } : projectServerErrorHtml;
    }   
}

async function generateDiaryHTML(diary: Diary, selectedPage?: number, api: boolean = false): Promise<string|APIReturn> {
    // First we test if the file exist
    if(!diaryFiles.find((f) => f.isFile() && f.name === `${diary.name}.adoc`)) return api ? { type: "error", html: projectNotFoundHtml } : projectNotFoundHtml;
    
    // First we need the page number and the path to load
    const page: number = Number.parseInt(selectedPage?.toString() || "0") - 1;
    // If the page number is not -1, a directory must exist
    if (page !== -1 && !diaryFiles.find((f) => f.isDirectory() && f.name === diary.name)) return api ? { type: "error", html: projectNotFoundHtml } : projectNotFoundHtml;

    // Next we load the correct path
    const path = page === -1 ? resolve(diaryPath, `${diary.name}.adoc`) : resolve(diaryPath, diary.name, `${diary.entries[page].filename}.adoc`);

    try {
        // Read the file
        const rawAd = await readFile(path, { encoding: "utf-8" });

        // Correct the paths so that the images are loaded correctly
        const pathsCorrected = rawAd.replace(/(image[:]{1,2})(.*\.[a-zA-Z]+)\[/g, "$1/content/diaries/$2[");
        const adDoc = ad.load(pathsCorrected, { attributes: { showtitle: true } });
        const gitfile = page === -1 ? `${diary.name}.adoc` : `${diary.name}/${diary.entries[page].filename}.adoc`;
        
        // Convert to HTML
        const converted = adDoc.convert(adDoc).toString();

        // For the API we want the HTML and the date only
        if (api) return {
            type: "success",
            html: converted,
            date: new Date(adDoc.getAttribute("docdatetime")).toISOString(),
            repoUrl: `https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/${process.env.IS_DEV ? "dev" : "senpai"}/diaries/${gitfile}`,
        };

        // Return and add the footer
        return `${converted}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${new Date(adDoc.getAttribute("docdatetime")).toLocaleString()} | <a href="https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/${process.env.IS_DEV ? "dev" : "senpai"}/diaries/${gitfile}" target="_blank">Document source</a>
    </div>
</div>`;
    } catch (e) {
        // Something gone wrong
        console.error(e);
        return api ? { type: "error", html: projectServerErrorHtml } : projectServerErrorHtml;
    }
}

export function prepareDOM(html: string) {
    const dom = (new JSDOM(html)).window.document;
    dom.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
    });

    dom.querySelectorAll("a[href^='#']").forEach((link) => {
        (link as HTMLAnchorElement).href = `/blog/${(link as HTMLAnchorElement).href.split("#")[1]}`;
    });

    return dom.body.innerHTML;
}