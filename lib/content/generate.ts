import type { Project, Diary } from "./types";
import asciidoctor from "asciidoctor";

export const projectEmpty = "<div>Kein Projekt ausgewählt.</div>";
const projectNotFoundHtml = `<div class="${"error"}">Sorry! There is no data for this project. Please check back later to see if that changed!</div>`;
const projectServerErrorHtml = `<div class="${"error"}">Sorry! A server error happend when the project data was fetched!</div>`;

const ad = asciidoctor();

export async function generateContent(content: Project|Diary, selectedPage?: number): Promise<string> {
    if(!content) return projectEmpty;
    switch (content.type) {
        case "project": return await generateProjectHTML(content);
        case "diary": return await generateDiaryHTML(content, selectedPage);
        default: return projectNotFoundHtml;
    } 
}

async function generateProjectHTML(project: Project): Promise<string> {
    const resp = await fetch(`/content/projects/${project.name}.adoc`);
    if (resp.status !== 200) return projectServerErrorHtml;
    const rawAd = await resp.text();
    const pathsCorrected = rawAd.replace(/(image[:]+)(.*\.[a-zA-Z]+)\[/g, "$1/content/projects/$2[");
    const adDoc = ad.load(pathsCorrected, { attributes: { showtitle: true } });
    return `${adDoc.convert(adDoc).toString()}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${adDoc.getAttribute("docdatetime")} | <a href="https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/senpai/projects/${project.name}.adoc">Document source</a>
    </div>
</div>`;
}

async function generateDiaryHTML(diary: Diary, selectedPage?: number): Promise<string> {
    const resp = selectedPage === undefined ? await fetch(`/content/diaries/${diary.name}.adoc`) : await fetch(`/content/diaries/${diary.name}/${diary.entries[selectedPage].filename}.adoc`);
    if (resp.status !== 200) return projectServerErrorHtml;
    const adDoc = ad.load(await resp.text(), { attributes: { showtitle: true } });
    const gitfile = selectedPage === undefined ? `${diary.name}.adoc` : `${diary.name}/${diary.entries[selectedPage].filename}.adoc`;
    return `${adDoc.convert(adDoc).toString()}
<hr>
<div id="footer">
    <div id="footer-text">
        Last updated: ${adDoc.getAttribute("docdatetime")} | <a href="https://git.c0ntroller.de/c0ntroller/frontpage-content/src/branch/senpai/diaries/${gitfile}">Document source</a>
    </div>
</div>`;
}