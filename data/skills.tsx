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
    useDarkColor: boolean;
    badges?: {
        background: string;
        useDarkColor: boolean;
    }
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
                icon: <Icon path={mdiLanguageTypescript} size={sizeCardIcons} id="mdi_skills_prog_ts" />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={sizeCardIcons} id="mdi_skills_prog_js" />,
                pct: 100
            }, {
                name: "Java",
                icon: <Icon path={mdiLanguageJava} size={sizeCardIcons} id="mdi_skills_prog_java" />,
                pct: 80
            }, {
                name: "Python 3",
                icon: <Icon path={mdiLanguagePython} size={sizeCardIcons} id="mdi_skills_prog_python" />,
                pct: 95
            }, {
                name: "PHP",
                icon: <Icon path={mdiLanguagePhp} size={sizeCardIcons} id="mdi_skills_prog_php" />,
                pct: 50
            }, {
                name: "Bash",
                icon: <Icon path={mdiBash} size={sizeCardIcons} id="mdi_skills_prog_bash" />,
                pct: 60
            }, {
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={sizeCardIcons} id="mdi_skills_prog_c" />,
                pct: 60
            }, {
                name: "Rust",
                icon: <Icon path={mdiLanguageRust} size={sizeCardIcons} id="mdi_skills_prog_rust" />,
                pct: 80
            }, {
                name: "C#",
                icon: <Icon path={mdiLanguageCsharp} size={sizeCardIcons} id="mdi_skills_prog_cs" />,
                pct: 40
            }],
            colors: {
                background: "#C3A3F7",
                bars: "#8771AB",
                heading: "#55476B",
                useDarkColor: true,
                badges: {
                    background: "#55476B",
                    useDarkColor: false,
                }
            }
        }, {
            title: "Web Technologies",
            skillBars: [{
                name: "TypeScript",
                icon: <Icon path={mdiLanguageTypescript} size={sizeCardIcons} id="mdi_skills_web_ts" />,
                pct: 100
            }, {
                name: "JavaScript",
                icon: <Icon path={mdiLanguageJavascript} size={sizeCardIcons} id="mdi_skills_web_js" />,
                pct: 100
            }, {
                name: "React",
                icon: <Icon path={mdiReact} size={sizeCardIcons} id="mdi_skills_web_react" />,
                pct: 80
            }, {
                name: "HTML5",
                icon: <Html5 size={sizeCardIcons} id="mdi_skills_web_html" />,
                pct: 80
            }, {
                name: "CSS3",
                icon: <CssThree size={sizeCardIcons} id="mdi_skills_web_css" />,
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
            colors: {
                background: "#A4C7EA",
                bars: "#706EB8",
                heading: "#2A2885",
                useDarkColor: true,
                badges: {
                    background: "#2A2885",
                    useDarkColor: false,
                }
            }
        }, {
            title: "Embedded Programming",
            skillBars: [{
                name: "C/C++",
                icon: <Icon path={mdiLanguageCpp} size={sizeCardIcons} id="mdi_skills_embedded_c" />,
                pct: 60
            }],
            additional: [{
                name: "Arduino",
                icon: <Arduino size={sizeBadgeIcons} />
            }, {
                name: "ESP",
                icon: <Espressif size={sizeBadgeIcons} />
            }],
            colors: {
                background: "#EA8585",
                bars: "#E53E3E",
                heading: "#661C1C",
                useDarkColor: true,
                badges: {
                    background: "#661C1C",
                    useDarkColor: false,
                }
            }
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
            }],
            colors: {
                background: "#4DEB8C",
                bars: "#38AB66",
                heading: "#236B40",
                useDarkColor: true,
                badges: {
                    background: "#236B40",
                    useDarkColor: false
                }
            }
        }, {
            title: "Languages",
            skillBars: [{
                name: "German (native)",
                icon: <Icon path={mdiTranslateVariant} size={sizeCardIcons} id="mdi_skills_lang_de" />,
                pct: 100
            }, {
                name: "English (C1)",
                icon: <Icon path={mdiTranslateVariant} size={sizeCardIcons} id="mdi_skills_lang_en" />,
                pct: 90
            }, {
                name: "Russian (basics)",
                icon: <Icon path={mdiTranslateVariant} size={sizeCardIcons} id="mdi_skills_lang_ru" />,
                pct: 30
            }],
            colors: {
                background: "#EB783F",
                bars: "#AB582E",
                heading: "#6B371D",
                useDarkColor: true,
                badges: {
                    background: "#6B371D",
                    useDarkColor: false,
                }
            }
        }]
    };
};

export default skills;