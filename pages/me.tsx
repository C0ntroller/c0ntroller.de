import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "../components/Blog/Layout";

import styles from "../styles/Blog/AboutMe.module.scss";

import skills, { AdditionalSkill, Skill, SkillCard } from "../data/skills";
import achievements from "../data/achievements";

const Badge: NextPage<{ additional: AdditionalSkill }> = ({ additional }) => {
    return <div className={styles.badge}>
        {additional.icon || null} {additional.name}
    </div>;
};

const SkillBar: NextPage<{ skill: Skill }> = ({ skill }) => {
    return <div className={styles.skillBar}>
        <div className={styles.barName}>{skill.name}{skill.icon || null}</div>
        <div className={styles.percentBar} style={{"--barPct": skill.pct + "%"} as React.CSSProperties}>
            <div className={`${styles.front} vpAnimated`}></div>
        </div>
    </div>;
};

const SkillCard: NextPage<{ card: SkillCard }> = ({ card }) => {
    return <div className={styles.card}>
    <h3>{card.title}</h3>
    {card.skillBars.sort((bar1, bar2) => bar2.pct - bar1.pct).map((skill, i) =>
        <SkillBar key={i} skill={skill} />
    )}<br/>
    {card.additional?.map((skill, i) => <Badge additional={skill} key={i} />)}
</div>;
};

const Me: NextPage = () => {
    useEffect(() => {
        const handleScrollAnimation = () => {
            document.querySelectorAll(".vpAnimated").forEach((element) => {
                const rect = element.getBoundingClientRect();
                const inVp = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
                if (inVp) (element as HTMLElement).style.animationPlayState = "running";
                else (element as HTMLElement).style.animationPlayState = "paused";
            });
        };

        handleScrollAnimation(); // First time so we don't _need_ scrolling
        window.addEventListener("scroll", handleScrollAnimation);
    }, []);

    const age = new Date().getFullYear() - 1998 - (new Date().getMonth() < 10 ? 1 : 0);

    return <Layout>
        <h1>This is me.</h1>
        <p className={styles.preText}>
            Hi! My name is <strong>Daniel</strong> and I&apos;m an automation engineer from Germany.
        </p>
        <p>
            I&apos;m currently {age} years old and studying <strong>Information Systems Engineering</strong> at the <strong>TU Dresden</strong>.
        </p>
        <h2>Achievements</h2>
        {achievements().map((achievement, i) => <div key={i} className={styles.achievement}>
            <span>{achievement.icon}</span><span>{achievement.description}</span>
        </div>)}
        <h2>Skills</h2>
        {skills().cards.map((card, i) => <SkillCard key={i} card={card} />)}
    </Layout>;
};

export default Me;