import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Discord, Github, Instagram, Steam, Linkedin } from "@icons-pack/react-simple-icons";
import Layout from "../components/Blog/Layout";

import styles from "../styles/Blog/AboutMe.module.scss";
import pic from "../public/img/me.png";

import skills, { AdditionalSkill, Skill, SkillCard } from "../data/skills";
import achievements from "../data/achievements";
import socials from "../data/socials";

const Badge: NextPage<{ additional: AdditionalSkill }> = ({ additional }) => {
    return <div className={styles.badge}>
        <span>{additional.icon || null}</span><span>{additional.name}</span>
    </div>;
};

const SkillBar: NextPage<{ skill: Skill }> = ({ skill }) => {
    return <div className={styles.skillBar}>
        <div className={styles.barName}>{skill.icon || null}</div>
        <div className={styles.percentBar} style={{"--barPct": skill.pct + "%"} as React.CSSProperties}>
            <div className={`${styles.front} vpAnimated`}></div>
        </div>
        <div>{skill.name}</div>
    </div>;
};

const SkillCard: NextPage<{ card: SkillCard }> = ({ card }) => {
    const cardStyle = {
        background: card.colors?.background,
        "--ch-color": card.colors?.heading,
        "--bar-color": card.colors?.bars,
        color: card.colors?.useDarkColor === undefined ? undefined : (card.colors?.useDarkColor ? "#222" : "#ddd"),
        "--badge-bg": card.colors?.badges?.background,
        "--badge-color": card.colors?.badges?.useDarkColor === undefined ? undefined : (card.colors?.badges?.useDarkColor ? "#222" : "#ddd"),
    } as React.CSSProperties;

    return <div className={styles.skillCard} style={cardStyle}>
    <h3>{card.title}</h3>
    <div className={styles.skillBarsSet}>
    {card.skillBars.sort((bar1, bar2) => bar2.pct - bar1.pct).map((skill, i) =>
        <SkillBar key={i} skill={skill} />
    )}
    </div>
    {card.additional && card.additional.length > 0 ? <div className={styles.badgeSet}>
        {card.additional?.map((skill, i) => <Badge additional={skill} key={i} />)}
    </div> : null}
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
        <div className={styles.photo}>
            <Image src={pic} alt="Me" layout="responsive" />
        </div>
        <div className={styles.personal}>
            <p className={styles.preText}>
                My name is <strong>Daniel</strong> and I&apos;m a prospective <strong>automation engineer</strong>, <strong>hardware enthusiast</strong>, and <strong>software developer</strong> from Germany.<br/>
                I&apos;m {age} years old and studying <strong>Information Systems Engineering</strong> at <strong>TU Dresden</strong>.
            </p>
            <p>
                To be honest, I don&apos;t really know what to write here.
                What could you - some visitor of my website - possibly want to know about me?
            </p><p>
                Maybe you are an employer and want to know what I can do for you?
                Then see below - I tried to list all my skills and achievements.
                If your company is doing anything related to software development (even low-level ones like embedded controllers), I&apos;m probably suited for it.
            </p><p>
                But maybe you are just another guy on the internet browsing through my website?
                Well then have fun!
                I hope you find what you are looking for.
                If you haven&apos;t seen it already, you should check out the <Link href="/terminal"><a className="nocolor">command line</a></Link> I made.
                Otherwise, have fun poking around in my <Link href="/"><a className="nocolor">projects</a></Link>.
            </p><p>
                Do you want to know more about my personal life?
                Well, I like to play video games, and watch anime, I love cats and <a href="https://www.reddit.com/r/blahaj" target="_blank" rel="noreferrer" className="nocolor">sharks</a>.
                So just your ordinary nerdy student.<br/>
                If you want to be even more invested in my personal life, check out my socials below.
            </p><p>
                Any questions I did not cover, but you are interested in?
                Just contact me <a className="nocolor" href="mailto:admin-website@c0ntroller.de" rel="noreferrer" target="_blank">via email</a> or any of the socials below!
            </p>
        </div>
        <h2>Social Media</h2>
        <div className={styles.socials}>
            {socials("2em").map((social, i) => 
                <a key={i} href={social.url} target="_blank" rel="noreferrer" className="nocolor">
                    {social.icon}
                </a>
            )}
        </div>
        <h2>Achievements</h2>
        {achievements().map((achievement, i) => <div key={i} className={styles.achievement}>
            <span>{achievement.icon}</span><span>{achievement.description}</span>
        </div>)}
        <h2>Skills</h2>
        {skills().cards.map((card, i) => <SkillCard key={i} card={card} />)}
    </Layout>;
};

export default Me;