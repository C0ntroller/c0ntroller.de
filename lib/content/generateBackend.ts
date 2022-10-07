// This file is used to generate the HTML for the projects and diaries in the backend.
// We can use fs and stuff here.

import { readdirSync } from "fs";
import { readFile } from "node:fs/promises";
import { resolve } from "path";
import type { Project, Diary } from "./types";
import asciidoctor from "asciidoctor";

export const projectEmpty = "<div>Kein Projekt ausgewählt.</div>";
const projectNotFoundHtml = `<div class="${"error"}">Sorry! There is no data for this project. Please check back later to see if that changed!</div>`;
const projectServerErrorHtml = `<div class="${"error"}">Sorry! A server error happend when the project data was fetched!</div>`;

const ad = asciidoctor();

// No error catching here as we are screwed if this fails
const projectPath = resolve("./public", "content", "projects");
const diaryPath = resolve("./public", "content", "diaries");
const projectFiles = readdirSync(projectPath, { withFileTypes: true }).filter((f) => f.isFile() && f.name.endsWith(".adoc"));
// As we need the diaries too, no filter here
const diaryFiles = readdirSync(diaryPath, { withFileTypes: true });

export async function generateContent(content: Project|Diary, selectedPage?: number): Promise<string> {
    if(!content) return projectEmpty;
    switch (content.type) {
        case "project": return await generateProjectHTML(content);
        case "diary": return await generateDiaryHTML(content, selectedPage);
        default: return projectNotFoundHtml;
    } 
}

async function generateProjectHTML(project: Project): Promise<string> {
    // First we test if the file exist
    if(!projectFiles.find((f) => f.name === `${project.name}.adoc`)) return projectNotFoundHtml;

    // Resolve the path
    const path = resolve(projectPath, `${project.name}.adoc`);

    try {
        // Read the file
        const rawAd = await readFile(path, { encoding: "utf-8" });

        // Correct the paths so that the images are loaded correctly
        const pathsCorrected = rawAd.replace(/(image[:]+)(.*\.[a-zA-Z]+)\[/g, "$1/content/projects/$2[");
        const adDoc = ad.load(pathsCorrected, { attributes: { showtitle: true } });

        // Return and add the footer
        return `${adDoc.convert(adDoc).toString()}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${new Date(adDoc.getAttribute("docdatetime")).toLocaleString()} | <a href="https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/${process.env.IS_DEV ? "dev" : "senpai"}/projects/${project.name}.adoc" target="_blank">Document source</a>
    </div>
</div>`;
    } catch (e) {
        // Something gone wrong
        console.error(e);
        return projectServerErrorHtml;
    }   
}

async function generateDiaryHTML(diary: Diary, selectedPage?: number): Promise<string> {
    // First we test if the file exist
    if(!diaryFiles.find((f) => f.isFile() && f.name === `${diary.name}.adoc`)) return projectNotFoundHtml;
    
    // First we need the page number and the path to load
    const page: number = Number.parseInt(selectedPage?.toString() || "0") - 1;
    // If the page number is not -1, a directory must exist
    if (page !== -1 && !diaryFiles.find((f) => f.isDirectory() && f.name === diary.name)) return projectNotFoundHtml;

    // Next we load the correct path
    const path = page === -1 ? resolve(diaryPath, `${diary.name}.adoc`) : resolve(diaryPath, diary.name, `${diary.entries[page].filename}.adoc`);

    try {
        // Read the file
        const rawAd = await readFile(path, { encoding: "utf-8" });

        // Correct the paths so that the images are loaded correctly
        const pathsCorrected = rawAd.replace(/(image[:]{1,2})(.*\.[a-zA-Z]+)\[/g, "$1/content/diaries/$2[");
        const adDoc = ad.load(pathsCorrected, { attributes: { showtitle: true } });
        const gitfile = page === -1 ? `${diary.name}.adoc` : `${diary.name}/${diary.entries[page].filename}.adoc`;
        // Return and add the footer
        return `${adDoc.convert(adDoc).toString()}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${new Date(adDoc.getAttribute("docdatetime")).toLocaleString()} | <a href="https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/${process.env.IS_DEV ? "dev" : "senpai"}/diaries/${gitfile}" target="_blank">Document source</a>
    </div>
</div>`;
    } catch (e) {
        // Something gone wrong
        console.error(e);
        return projectServerErrorHtml;
    }
}