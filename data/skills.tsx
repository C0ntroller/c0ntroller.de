import Icon from "@mdi/react";
import { mdiBash, mdiLanguageCpp, mdiLanguageCsharp, mdiLanguageJava, mdiLanguageJavascript, mdiLanguagePhp, mdiLanguagePython, mdiLanguageRust, mdiLanguageTypescript, mdiReact } from "@mdi/js";
import { Android, Arduino, CssThree, Espressif, Express, Html5, Linux, Sass, Springboot, Windows } from "@icons-pack/react-simple-icons";

export interface Skill {
    name: string;
    icon?: JSX.Element;
    pct: number;
}

export interface AdditionalSkill {
    name: string;
    icon?: JSX.Element;
}

export interface SkillCard {
    title: string;
    skillBars: Skill[];
    additional?: AdditionalSkill[];
}

export interface SkillSet {
    cards: SkillCard[];
    additional?: AdditionalSkill[];
}

export const skills = (sizeCardIcons?: string, sizeBadgeIcons?: string): SkillSet => {
    return {
        cards: [{
            title: "Programming Languages",
            skillBars: [{
                name: "TypeScript",
                icon: <Icon path={mdiLanguageTypescript} size={sizeCardIcons || "2em"} />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={sizeCardIcons || "2em"} />,
                pct: 100
            }, {
                name: "Java",
                icon: <Icon path={mdiLanguageJava} size={sizeCardIcons || "2em"} />,
                pct: 80
            }, {
                name: "Python 3",
                icon: <Icon path={mdiLanguagePython} size={sizeCardIcons || "2em"} />,
                pct: 95
            }, {
                name: "PHP",
                icon: <Icon path={mdiLanguagePhp} size={sizeCardIcons || "2em"} />,
                pct: 50
            }, {
                name: "Bash",
                icon: <Icon path={mdiBash} size={sizeCardIcons || "2em"} />,
                pct: 60
            }, {
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={sizeCardIcons || "2em"} />,
                pct: 60
            }, {
                name: "Rust",
                icon: <Icon path={mdiLanguageRust} size={sizeCardIcons || "2em"} />,
                pct: 80
            }, {
                name: "C#",
                icon: <Icon path={mdiLanguageCsharp} size={sizeCardIcons || "2em"} />,
                pct: 40
            }]
        }, {
            title: "Web Technologies",
            skillBars: [{
                name: "TypeScript",
                icon: <Icon path={mdiLanguageTypescript} size={sizeCardIcons || "2em"} />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={sizeCardIcons || "2em"} />,
                pct: 100
            }, {
                name: "React",
                icon: <Icon path={mdiReact} size={sizeCardIcons || "2em"} />,
                pct: 80
            }, {
                name: "HTML5",
                icon: <Html5 size={sizeCardIcons || "2em"} />,
                pct: 80
            }, {
                name: "CSS3",
                icon: <CssThree size={sizeCardIcons || "2em"} />,
                pct: 90
            }],
            additional: [{
                name: "Express",
                icon: <Express size={sizeBadgeIcons || "1em"} />
            }, {
                name: "Sass",
                icon: <Sass size={sizeBadgeIcons || "1em"} />
            }, {
                name: "Spring Boot",
                icon: <Springboot size={sizeBadgeIcons || "1em"} />
            }]
        }, {
            title: "Embedded Programming",
            skillBars: [{
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={sizeCardIcons || "2em"} />,
                pct: 60
            }],
            additional: [{
                name: "Arduino",
                icon: <Arduino size={sizeBadgeIcons || "1em"} />
            }, {
                name: "ESP",
                icon: <Espressif size={sizeBadgeIcons || "1em"} />
            }]
        }, {
            title: "Operating Systems",
            skillBars: [],
            additional: [{
                name: "Windows",
                icon: <Windows size={sizeBadgeIcons || "1em"} />
            }, {
                name: "Linux",
                icon: <Linux size={sizeBadgeIcons || "1em"} />
            }, {
                name: "Android",
                icon: <Android size={sizeBadgeIcons || "1em"} />
            }]
        }, {
            title: "Languages",
            skillBars: [{
                name: "German (native)",
                icon: <span style={{ fontSize: sizeCardIcons || "2em" }}>🇩🇪</span>,
                pct: 100
            }, {
                name: "English (C1)",
                icon: <span style={{ fontSize: sizeCardIcons || "2em" }}>🇬🇧</span>,
                pct: 90
            }, {
                name: "Russian (basics)",
                icon: <span style={{ fontSize: sizeCardIcons || "2em", fontFamily: "Arial" }}>🇷🇺</span>,
                pct: 30
            }],
            additional: []
        }]
    };
};

export default skills;