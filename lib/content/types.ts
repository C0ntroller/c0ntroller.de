export type ContentList = (Project | Diary)[];

export type ContentType = "project" | "diary";

interface Content {
    type: "project" | "diary";
    name: string;
    desc: string[];
    short_desc: string;
    more?: string;
    repo?: string;
}

export interface Project extends Content {
    type: "project";
}

export interface Diary extends Content {
    type: "diary";
    entries: {
        title: string;
        filename: string;
    }[];
}
