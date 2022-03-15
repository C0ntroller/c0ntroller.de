export interface ProjectList {
    projects: Project[];
    diaries: Diary[];
}

export interface Project {
    name: string;
    desc: string[];
    short_desc: string;
    more?: string;
    repo?: string;
}

export interface Diary {
    name: string;
    desc: string[];
    short_desc: string;
    more?: string;
    repo?: string;
    entries: {
        title: string;
        path: string;
    }[];
}