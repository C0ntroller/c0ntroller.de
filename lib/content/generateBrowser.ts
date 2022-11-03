// This file is used for the generation of the static HTML files in the frontend.
// It is used by the terminal.

import type { Project, Diary } from "./types";
import type { APIReturn } from "./generateBackend";

export const projectEmpty = "<div>Kein Projekt ausgewählt.</div>";
const projectNotFoundHtml = `<div class="${"error"}">Sorry! There is no data for this project. Please check back later to see if that changed!</div>`;
const projectServerErrorHtml = `<div class="${"error"}">Sorry! A server error happend when the project data was fetched!</div>`;

export async function generateContent(content: Project|Diary, selectedPage?: number): Promise<string> {
    if(!content) return projectEmpty;
    switch (content.type) {
        case "project": return await generateProjectHTML(content);
        case "diary": return await generateDiaryHTML(content, selectedPage);
        default: return projectNotFoundHtml;
    } 
}

async function generateProjectHTML(project: Project): Promise<string> {
    const resp = await fetch(`/api/contentRendering?name=${project.name}`);
    if (resp.status !== 200) return projectServerErrorHtml;
    const response = await resp.json() as APIReturn;

    if (!response || !response.type) return projectServerErrorHtml;
    if (response.type === "error") return response.html;
    else {
        return `${response.html}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${new Date(response.date).toLocaleString()} | <a href="${response.repoUrl}" target="_blank">Document source</a>
    </div>
</div>`;
    }
    
    
}

async function generateDiaryHTML(diary: Diary, selectedPage?: number): Promise<string> {
    const url = `/api/contentRendering?name=${diary.name}${selectedPage ? `&page=${selectedPage}` : ""}`;
    const resp = await fetch(url);
    const response = await resp.json() as APIReturn;

    if (!response || !response.type) return projectServerErrorHtml;
    if (response.type === "error") return response.html;
    return `${response.html}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${new Date(response.date).toLocaleString()} | <a href="${response.repoUrl}" target="_blank">Document source</a>
    </div>
</div>`;
}