import type { NextPage } from "next";
import Head from "next/head";
import Navigation from "./Navigation";

import styles from "../../styles/Blog/Blog.module.scss";

import socials from "../../data/socials";

interface ILayoutProps {
    title?: string;
}

const Layout: NextPage<ILayoutProps> = ({ title, children }) => {
    const socialLinks = socials("1.1em").map((social, i) => <a key={i} href={social.url} target="_blank" rel="noreferrer" className={styles.socialIcon}>{social.icon}</a>); 

    return <>
        <Head>
            <title>{title ?? "c0ntroller.de"}</title>
        </Head>
        <div id={styles.blogBody}>
            <span id="top" aria-hidden></span>
            <header>
                <Navigation />
            </header>
            <main>
                { children }
            </main>
            <footer id="bottom">
                <span style={{visibility: "hidden"}}>▲</span>
                <span className={styles.spacer}></span>
                <span className={styles.footerContent}>
                    <span>© 2022 Daniel Kluge</span>
                    <span className={styles.divider}>|</span>
                    {socialLinks.flatMap((social, i) => i !== 0 ? [<span className={styles.divider} key={`d${i}`}>|</span>, social] : [social])}
                    <span className={styles.divider}>|</span>
                    <a className="nostyle" target="_blank" href="mailto:admin-website@c0ntroller.de" rel="noreferrer">Contact</a>
                </span>
                <span className={styles.spacer}></span>
                <a className="nostyle" href="#top" title="Back to top">▲</a>
            </footer>
        </div>
    </>;
};

export default Layout;