import Icon from "@mdi/react";
import { mdiBash, mdiLanguageCpp, mdiLanguageCsharp, mdiLanguageJava, mdiLanguageJavascript, mdiLanguagePhp, mdiLanguagePython, mdiLanguageRust, mdiLanguageTypescript, mdiReact, mdiTranslateVariant } from "@mdi/js";
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

export interface CardColors {
    background: string;
    bars: string;
    heading: string;
}

export interface SkillCard {
    title: string;
    skillBars: Skill[];
    additional?: AdditionalSkill[];
    colors?: CardColors;
}

export interface SkillSet {
    cards: SkillCard[];
    additional?: AdditionalSkill[];
}

export const skills = (sizeCardIcons?: string, sizeBadgeIcons?: string): SkillSet => {
    sizeCardIcons = sizeCardIcons || "2em";
    sizeBadgeIcons = sizeBadgeIcons || "1em";

    return {
        cards: [{
            title: "Programming Languages",
            skillBars: [{
                name: "TypeScript",
                icon: <Icon path={mdiLanguageTypescript} size={sizeCardIcons} />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={sizeCardIcons} />,
                pct: 100
            }, {
                name: "Java",
                icon: <Icon path={mdiLanguageJava} size={sizeCardIcons} />,
                pct: 80
            }, {
                name: "Python 3",
                icon: <Icon path={mdiLanguagePython} size={sizeCardIcons} />,
                pct: 95
            }, {
                name: "PHP",
                icon: <Icon path={mdiLanguagePhp} size={sizeCardIcons} />,
                pct: 50
            }, {
                name: "Bash",
                icon: <Icon path={mdiBash} size={sizeCardIcons} />,
                pct: 60
            }, {
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={sizeCardIcons} />,
                pct: 60
            }, {
                name: "Rust",
                icon: <Icon path={mdiLanguageRust} size={sizeCardIcons} />,
                pct: 80
            }, {
                name: "C#",
                icon: <Icon path={mdiLanguageCsharp} size={sizeCardIcons} />,
                pct: 40
            }],
            /*colors: {
                background: "#690000",
                bars: "#fff",
                heading: "#fff"
            }*/
        }, {
            title: "Web Technologies",
            skillBars: [{
                name: "TypeScript",
                icon: <Icon path={mdiLanguageTypescript} size={sizeCardIcons} />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={sizeCardIcons} />,
                pct: 100
            }, {
                name: "React",
                icon: <Icon path={mdiReact} size={sizeCardIcons} />,
                pct: 80
            }, {
                name: "HTML5",
                icon: <Html5 size={sizeCardIcons} />,
                pct: 80
            }, {
                name: "CSS3",
                icon: <CssThree size={sizeCardIcons} />,
                pct: 90
            }],
            additional: [{
                name: "Express",
                icon: <Express size={sizeBadgeIcons} />
            }, {
                name: "Sass",
                icon: <Sass size={sizeBadgeIcons} />
            }, {
                name: "Spring Boot",
                icon: <Springboot size={sizeBadgeIcons} />
            }],
            /*colors: {
                background: "#2196f3",
                bars: "#217fff",
                heading: "#2043ff"
            }*/
        }, {
            title: "Embedded Programming",
            skillBars: [{
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={sizeCardIcons} />,
                pct: 60
            }],
            additional: [{
                name: "Arduino",
                icon: <Arduino size={sizeBadgeIcons} />
            }, {
                name: "ESP",
                icon: <Espressif size={sizeBadgeIcons} />
            }],
            /*colors: {
                background: "#EA8585",
                bars: "#E53E3E",
                heading: "#661C1C"
            }*/
        }, {
            title: "Operating Systems",
            skillBars: [],
            additional: [{
                name: "Windows",
                icon: <Windows size={sizeBadgeIcons} />
            }, {
                name: "Linux",
                icon: <Linux size={sizeBadgeIcons} />
            }, {
                name: "Android",
                icon: <Android size={sizeBadgeIcons} />
            }]
        }, {
            title: "Languages",
            skillBars: [{
                name: "German (native)",
                icon: <Icon path={mdiTranslateVariant} size={sizeCardIcons} />,
                pct: 100
            }, {
                name: "English (C1)",
                icon: <Icon path={mdiTranslateVariant} size={sizeCardIcons} />,
                pct: 90
            }, {
                name: "Russian (basics)",
                icon: <Icon path={mdiTranslateVariant} size={sizeCardIcons} />,
                pct: 30
            }],
            additional: []
        }]
    };
};

export default skills;