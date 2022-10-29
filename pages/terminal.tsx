import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiEmail } from "@mdi/js";
import { useEffect, useRef,useCallback } from "react";
import { useCommands } from "../lib/commands/ContextProvider";
import { useModalFunctions } from "../components/Terminal/contexts/ModalFunctions";
import ProjectModal from "../components/Terminal/ProjectModal";
import REPL from "../components/Terminal/REPL";
import type { ContentList } from "../lib/content/types";
import { useRouter } from "next/router";
import Rainbow from "../lib/colors";

import styles from "../styles/Terminal/Terminal.module.css";

import socials from "../data/socials";

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
                <Link href="/"><a>Main page</a></Link>
                <span className={styles.divider}>|</span>
                <a href="https://github.com/C0ntroller/c0ntroller.de" target="_blank" rel="noreferrer">Source</a>
                <span className={styles.divider}>|</span>
                <a href="https://github.com/C0ntroller/c0ntroller.de/issues/new" target="_blank" rel="noreferrer">Bug?</a>
                <span className={styles.divider}>|</span>
                <a href="mailto:admin-website@c0ntroller.de" rel="noreferrer" target="_blank" className={styles.iconLink}><Icon path={mdiEmail} color="var(--repl_color)" size="1.5em" id="mdi_terminal_nav_email" title="Email" /></a>
                <span className={styles.divider}>|</span>
                {socials(iconSize, "var(--repl_color)").map((social, i) => <>
                    {i !== 0 ? <span className={styles.divider} key={`d${i}`}>|</span> : null}
                    <a key={i} href={social.url} target="_blank" rel="noreferrer" className={styles.iconLink}>{social.icon}</a>
                </>)}
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
