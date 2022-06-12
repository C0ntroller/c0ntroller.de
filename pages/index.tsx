import type { NextPage } from "next";
import Head from "next/head";
import { GithubLogo, InstagramLogo, DiscordLogo, GameController } from "phosphor-react";
import { useEffect, useRef,useCallback } from "react";
import { useCommands } from "../components/contexts/CommandInterface";
import { useModalFunctions } from "../components/contexts/ModalFunctions";
import ProjectModal from "../components/ProjectModal";
import REPL from "../components/REPL";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { modalFunctions } = useModalFunctions();
    const { setContents } = useCommands();

    const updateProjects = useCallback(async () => {
        try {
            const res = await fetch("/content/list.json");
            const projects = await res.json();
            setContents(projects);
        } catch {}
    }, [setContents]);

    updateProjects();

    const focusInput = () => { if (inputRef.current) inputRef.current.focus(); };

    const hideModalOnEsc = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            if(modalFunctions.setVisible) modalFunctions.setVisible(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(updateProjects, 30 * 1000);
        return () => clearInterval(interval);
    }, [updateProjects]);

    return (<main onKeyDown={hideModalOnEsc} tabIndex={-1}>
        <Head>
            <title>c0ntroller.de</title>
        </Head>
        <ProjectModal />
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
            <REPL inputRef={inputRef} />
        </div>
    </main>);
};

export default Home;
