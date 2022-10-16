/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { Terminal, Sun, Moon } from "phosphor-react";
import ThemeSwitch from "./ThemeSwitch";

import styles from "../../styles/Blog/Navigation.module.scss";

const Navigation: NextPage<{}> = () => {
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
        <ThemeSwitch />
    </nav>;
};

export default Navigation;
