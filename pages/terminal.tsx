import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { GithubLogo, InstagramLogo, DiscordLogo, GameController, Envelope } from "phosphor-react";
import { useEffect, useRef,useCallback } from "react";
import { useCommands } from "../lib/commands/ContextProvider";
import { useModalFunctions } from "../components/Terminal/contexts/ModalFunctions";
import ProjectModal from "../components/Terminal/ProjectModal";
import REPL from "../components/Terminal/REPL";
import styles from "../styles/Terminal/Terminal.module.css";
import type { ContentList } from "../lib/content/types";
import { useRouter } from "next/router";
import Rainbow from "../lib/colors";

const Home: NextPage<{ buildTime: string }> = ({ buildTime }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { modalFunctions } = useModalFunctions();
    const { setContents } = useCommands();
    const router = useRouter();

    const updateProjects = useCallback(async () => {
        try {
            const res = await fetch("/content/list.json");
            const projects: ContentList = await res.json();
            projects.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            setContents(projects);
        } catch {}
    }, [setContents]);

    const focusInput = () => { if (inputRef.current) inputRef.current.focus(); };

    const hideModalOnEsc = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            if(modalFunctions.setVisible) modalFunctions.setVisible(false);
        }
    };

    useEffect(() => {
        updateProjects().then(() => { if (modalFunctions.onContentReady) modalFunctions.onContentReady(); });
        const interval = setInterval(updateProjects, 30 * 1000);
        return () => clearInterval(interval);
    }, [updateProjects, modalFunctions]);

    useEffect(() => {
        if ("rainbow" in router.query) {
            Rainbow.start();
        }
    }, [router]);

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
                <a href="mailto:admin-website@c0ntroller.de" rel="noreferrer"><Envelope color="var(--repl_color)" className={styles.iconLink} alt="E-Mail" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://github.com/C0ntroller" target="_blank" rel="noreferrer"><GithubLogo color="var(--repl_color)" className={styles.iconLink} alt="GitHub" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://www.instagram.com/c0ntroller/" target="_blank" rel="noreferrer"><InstagramLogo color="var(--repl_color)" className={styles.iconLink} alt="Instagram" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://steamcommunity.com/id/c0ntroller/" target="_blank" rel="noreferrer"><GameController color="var(--repl_color)" className={styles.iconLink} alt="Steam" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://discordapp.com/users/224208617820127233" target="_blank" rel="noreferrer">
                    <span className={styles.tooltip} style={{ cursor: "pointer" }}>
                        <DiscordLogo color="var(--repl_color)" className={styles.iconLink} alt="Discord" />
                        <span className={styles.tooltiptext}>
                            C0ntroller_Z#3883
                        </span>
                    </span>
                </a>
                <span className={styles.spacer} onClick={focusInput}>&nbsp;</span>
            </div>
            <REPL inputRef={inputRef} buildTime={buildTime} />
        </div>
    </main>);
};

export const getStaticProps: GetStaticProps = async (_context) => {
    const date = new Date();
    const padD = (n: number) => n.toString().padStart(2, "0");
    const buildTime = `${date.getUTCFullYear()}${padD(date.getUTCDate())}${padD(date.getUTCMonth() + 1)}-${padD(date.getUTCHours())}${padD(date.getUTCMinutes())}`;
    return {
        props: {
            buildTime
        }
    };
};

export default Home;
