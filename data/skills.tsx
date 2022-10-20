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

export const skills = (size?: string): SkillSet => {
    return {
        cards: [{
            title: "Programming Languages",
            skillBars: [{
                name: "TypeScript",
                icon: <Icon path={mdiLanguageTypescript} size={size || "2em"} />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={size || "2em"} />,
                pct: 100
            }, {
                name: "Java",
                icon: <Icon path={mdiLanguageJava} size={size || "2em"} />,
                pct: 80
            }, {
                name: "Python 3",
                icon: <Icon path={mdiLanguagePython} size={size || "2em"} />,
                pct: 95
            }, {
                name: "PHP",
                icon: <Icon path={mdiLanguagePhp} size={size || "2em"} />,
                pct: 50
            }, {
                name: "Bash",
                icon: <Icon path={mdiBash} size={size || "2em"} />,
                pct: 60
            }, {
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={size || "2em"} />,
                pct: 60
            }, {
                name: "Rust",
                icon: <Icon path={mdiLanguageRust} size={size || "2em"} />,
                pct: 80
            }, {
                name: "C#",
                icon: <Icon path={mdiLanguageCsharp} size={size || "2em"} />,
                pct: 40
            }]
        }, {
            title: "Web Technologies",
            skillBars: [{
                name: "TypeScript",
                icon: <Icon path={mdiLanguageTypescript} size={size || "2em"} />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={size || "2em"} />,
                pct: 100
            }, {
                name: "React",
                icon: <Icon path={mdiReact} size={size || "2em"} />,
                pct: 80
            }, {
                name: "HTML5",
                icon: <Html5 size={size || "2em"} />,
                pct: 80
            }, {
                name: "CSS3",
                icon: <CssThree size={size || "2em"} />,
                pct: 90
            }],
            additional: [{
                name: "Express",
                icon: <Express size={size || "2em"} />
            }, {
                name: "Sass",
                icon: <Sass size={size || "2em"} />
            }, {
                name: "Spring Boot",
                icon: <Springboot size={size || "2em"} />
            }]
        }, {
            title: "Embedded Programming",
            skillBars: [{
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={size || "2em"} />,
                pct: 60
            }],
            additional: [{
                name: "Arduino",
                icon: <Arduino size={size || "2em"} />
            }, {
                name: "ESP",
                icon: <Espressif size={size || "2em"} />
            }]
        }, {
            title: "Operating Systems",
            skillBars: [],
            additional: [{
                name: "Windows",
                icon: <Windows size={size || "2em"} />
            }, {
                name: "Linux",
                icon: <Linux size={size || "2em"} />
            }, {
                name: "Android",
                icon: <Android size={size || "2em"} />
            }]
        }, {
            title: "Languages",
            skillBars: [{
                name: "German (native)",
                icon: <span style={{ fontSize: size || "2em" }}>🇩🇪</span>,
                pct: 100
            }, {
                name: "English (C1)",
                icon: <span style={{ fontSize: size || "2em" }}>🇬🇧</span>,
                pct: 90
            }, {
                name: "Russian (basics)",
                icon: <span style={{ fontSize: size || "2em", fontFamily: "Arial" }}>🇷🇺</span>,
                pct: 30
            }],
            additional: []
        }]
    };
};

export default skills;