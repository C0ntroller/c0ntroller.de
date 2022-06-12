export type ContentList = (Project|Diary)[];

export type ContentType = "project" | "diary";

export interface Project {
    type: "project";
    name: string;
    desc: string[];
    short_desc: string;
    more?: string;
    repo?: string;
}

export interface Diary {
    type: "diary";
    name: string;
    desc: string[];
    short_desc: string;
    more?: string;
    repo?: string;
    entries: {
        title: string;
        filename: string;
    }[];
}