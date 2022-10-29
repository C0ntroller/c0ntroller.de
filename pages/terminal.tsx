import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Icon from "@mdi/react";
import { mdiEmail } from "@mdi/js";
import { Discord, Github, Instagram, Steam, Linkedin } from "@icons-pack/react-simple-icons";
import { useEffect, useRef,useCallback } from "react";
import { useCommands } from "../lib/commands/ContextProvider";
import { useModalFunctions } from "../components/Terminal/contexts/ModalFunctions";
import ProjectModal from "../components/Terminal/ProjectModal";
import REPL from "../components/Terminal/REPL";
import styles from "../styles/Terminal/Terminal.module.css";
import type { ContentList } from "../lib/content/types";
import { useRouter } from "next/router";
import Rainbow from "../lib/colors";

const Terminal: NextPage<{ buildTime: string }> = ({ buildTime }) => {
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

    const iconSize = "1.3em";

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
                <a href="mailto:admin-website@c0ntroller.de" rel="noreferrer" className={styles.iconLink}><Icon path={mdiEmail} color="var(--repl_color)" size={"1.5em"} id={"mdi_terminal_nav_email"} title="Email" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://github.com/C0ntroller" target="_blank" rel="noreferrer" className={styles.iconLink}><Github color="var(--repl_color)" size={iconSize} title="Github" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://www.linkedin.com/in/c0ntroller/" target="_blank" rel="noreferrer" className={styles.iconLink}><Linkedin color="var(--repl_color)" size={iconSize} title="LinkedIn" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://www.instagram.com/c0ntroller/" target="_blank" rel="noreferrer" className={styles.iconLink}><Instagram color="var(--repl_color)" size={iconSize} title="Instagram" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://steamcommunity.com/id/c0ntroller/" target="_blank" rel="noreferrer" className={styles.iconLink}><Steam color="var(--repl_color)" size={iconSize} title="Steam" /></a>
                <span className={styles.divider}>|</span>
                <a href="https://discordapp.com/users/224208617820127233" target="_blank" rel="noreferrer" className={styles.iconLink}>
                    <span className={styles.tooltip} style={{ cursor: "pointer" }}>
                        <Discord color="var(--repl_color)" size={iconSize} title="Discord" />
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

export default Terminal;
