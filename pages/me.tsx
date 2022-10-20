import type { NextPage } from "next";
import Layout from "../components/Blog/Layout";
import * as phosphorIcons from "phosphor-react";

import styles from "../styles/Blog/AboutMe.module.scss";
import skills from "../data/skills.json";

interface Skill {
    name: string;
    icons: string[];
    pct: number;
}

interface AdditionalSkills {
    name: string;
    icon: string;
}

interface SkillCard {
    title: string;
    skillBars: Skill[];
    additional?: AdditionalSkills[];
}


interface SkillSet {
    cards: SkillCard[];
    additional: AdditionalSkills[];
}

const getIcon = (iconName: string, key?: number) => {
    const Icon = phosphorIcons[iconName as keyof typeof phosphorIcons] as any;
    if (!Icon) return null;
    else return <Icon key={key} />;
};

const SkillBar: NextPage<{ skill: Skill }> = ({ skill }) => {
    return <div className={styles.bar}>
        <div className={styles.barName}>{skill.name}{skill.icons.map(getIcon)}</div>
        <div className={styles.barPct}>{skill.pct}%</div>
    </div>;
};

const SkillCard: NextPage<{ card: SkillCard }> = ({ card }) => {
    return <div className={styles.card}>
    <h3>{card.title}</h3>
    {card.skillBars.map((skill, i) =>
        <SkillBar key={i} skill={skill} />
    )}
</div>;
};

const AboutMe: NextPage = () => {
    const age = new Date().getFullYear() - 1998 - (new Date().getMonth() < 10 ? 1 : 0);

    return <Layout>
        <h1>This is me.</h1>
        <p className={styles.preText}>
            Hi! My name is <strong>Daniel</strong> and I&apos;m an automation engineer from Germany.
        </p>
        <p>
            I&apos;m currently studying <strong>Information Systems Engineering</strong> at the <strong>TU Dresden</strong><br/>
            Currently I&apos;m {age} years old.
        </p>
        {skills.cards.map((card, i) => <SkillCard key={i} card={card} />)}
    </Layout>;

};

export default AboutMe;