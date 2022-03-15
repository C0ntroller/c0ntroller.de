import type { NextPage } from "next";
import Head from "next/head";
import { GithubLogo, InstagramLogo, DiscordLogo, GameController } from "phosphor-react";
import { useRef, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import REPL from "../components/REPL";
import type { Project, Diary } from "../lib/projects/types";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalProject, setModalProject] = useState<Project|Diary|undefined>(undefined);
    const [modalProjectType, setModalProjectType] = useState<"project"|"diary">("project");

    const focusInput = () => { if (inputRef.current) inputRef.current.focus(); };

    const hideModalOnEsc = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            setModalVisible(false);
        }
    };

    return (<main onKeyDown={hideModalOnEsc} tabIndex={-1}>
        <Head>
            <title>c0ntroller.de</title>
        </Head>
        <ProjectModal visible={modalVisible} project={modalProject} projectType={modalProjectType} setVisible={setModalVisible}/>
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.spacer} onClick={focusInput}>&nbsp;</span>
                <a href="https://github.com/C0ntroller/c0ntroller.de" target="_blank" rel="noreferrer">Source</a>
                <span className={styles.divider}>|</span>
                <a href="https://github.com/C0ntroller/c0ntroller.de/issues/new" target="_blank" rel="noreferrer">Bug?</a>
                <span className={styles.divider}>|</span>
                <a href="https://github.com/C0ntroller" target="_blank" rel="noreferrer"><GithubLogo color="var(--repl-color)" className={styles.iconLink} /></a>
                <span className={styles.divider}>|</span>
                <a href="https://www.instagram.com/c0ntroller/" target="_blank" rel="noreferrer"><InstagramLogo color="var(--repl-color)" className={styles.iconLink} /></a>
                <span className={styles.divider}>|</span>
                <a href="https://steamcommunity.com/id/c0ntroller/" target="_blank" rel="noreferrer"><GameController color="var(--repl-color)" className={styles.iconLink} /></a>
                <span className={styles.divider}>|</span>
                <a href="https://discordapp.com/users/224208617820127233" target="_blank" rel="noreferrer">
                    <span className={styles.tooltip} style={{ cursor: "pointer" }}>
                        <DiscordLogo color="var(--repl-color)" className={styles.iconLink} />
                        <span className={styles.tooltiptext}>
                            C0ntroller_Z#3883
                        </span>
                    </span>
                </a><span className={styles.spacer} onClick={focusInput}>&nbsp;</span>
            </div>
            <REPL inputRef={inputRef} modalManipulation={{setModalVisible, setModalProject, setModalProjectType}}/>
        </div>
    </main>);
};

export default Home;
