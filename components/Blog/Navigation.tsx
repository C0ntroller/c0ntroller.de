/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { Terminal, Sun, Moon } from "phosphor-react";

import styles from "../../styles/Blog/Navigation.module.scss";

const Navigation: NextPage<{}> = () => {
    const switchTheme = () => {
        if (typeof document === "undefined") return;

        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const setTo = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", setTo);

        if (typeof window !== "undefined") window.localStorage.setItem("theme", setTo);
    };

    return <nav className={styles.navigation}>
        <Link href={"/"}>
            <a className={`nostyle ${styles.imgContainer}`}>
                <picture>
                    <source srcSet="/icon.png" type="image/png" />
                    <img src="/icon.png" alt={"Website icon, a red eye"} className={styles.logo} />
                </picture>
            </a>
        </Link>
        <div className={styles.navLink}><Link href={"/"}><a className="nostyle">Projects</a></Link></div>
        <div className={styles.navLink}><Link href={"/"}><a className="nostyle">About me</a></Link></div>
        <div className={styles.spacer}></div>
        <Terminal size={"1.5em"} />
        <div className={styles.themeSwitch}>
            <Sun className={styles.lightTheme} size={"1.5em"} onClick={switchTheme} />
            <Moon className={styles.darkTheme} size={"1.5em"} onClick={switchTheme} />
        </div>
    </nav>;
};

export default Navigation;
