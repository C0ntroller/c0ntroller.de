export type ContentList = (Project | Diary)[];

export type ContentType = "project" | "diary";

interface Content {
    type: "project" | "diary";
    name: string;
    desc: string[];
    short_desc: string;
    more?: string;
    repo?: string;
    title: string;
}

export interface Project extends Content {
    type: "project";
}

export interface DiaryEntry {
    title: string;
    filename: string;
}

export interface Diary extends Content {
    type: "diary";
    entries: DiaryEntry[];
}

export interface ProjectRender extends Project {
    html: string;
}

export interface DiaryRender extends Diary {
    html: string;
    pageSelected: number;
}