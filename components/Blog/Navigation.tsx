/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiConsole, mdiAccount, mdiHome } from "@mdi/js";
import ThemeSwitch from "./ThemeSwitch";

import styles from "../../styles/Blog/Navigation.module.scss";
import logo from "../../public/img/icon.png";

const Navigation: NextPage<{}> = () => {
    return <nav className={styles.navigation}>
        <Link href="/">
            <a className={`nostyle ${styles.imgContainer} ${styles.logo}`}>
                <Image src={logo} alt="Logo" layout="fill" />
            </a>
        </Link>
        <div className={styles.navLink}>
            <Link href="/"><a className="nostyle">
            <span className={styles.linkText}>Projects</span>
            <span className={styles.linkIcon}><Icon path={mdiHome} size="2em" title="Home and Projects" id="mdi_nav_home" /></span>
            </a></Link>
        </div>
        <div className={styles.navLink}>
            <Link href="/me"><a className="nostyle">
                <span className={styles.linkText}>About Me</span>
                <span className={styles.linkIcon}><Icon path={mdiAccount} size="2em" title="About Me" id="mdi_nav_aboutme" /></span>
            </a></Link>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.navIcon}>
            <Link href="/terminal"><a className="nostyle">
                <Icon path={mdiConsole} size="2em" title="Terminal" id="mdi_nav_terminal" />
            </a></Link>
        </div>
        <ThemeSwitch />
    </nav>;
};

export default Navigation;
