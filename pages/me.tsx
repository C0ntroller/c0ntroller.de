import type { NextPage } from "next";
import Layout from "../components/Blog/Layout";

import styles from "../styles/Blog/AboutMe.module.scss";

const SkillBar: NextPage<{ skill: string, color: string, pct: number }> = ({skill, color, pct}) => {
    return <></>;
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
    </Layout>;

};

export default AboutMe;