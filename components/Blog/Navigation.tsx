/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { TerminalWindow, House, User } from "phosphor-react";
import ThemeSwitch from "./ThemeSwitch";

import styles from "../../styles/Blog/Navigation.module.scss";
import logo from "../../public/icon.png";

const Navigation: NextPage<{}> = () => {
    return <nav className={styles.navigation}>
        <Link href={"/"}>
            <a className={`nostyle ${styles.imgContainer} ${styles.logo}`}>
                <Image src={logo} alt={"Logo"} layout={"fill"} />
                {/*<picture>
                    <source srcSet="/icon.png" type="image/png" />
                    <img src="/icon.png" alt={"Website icon, a red eye"} className={styles.logo} />
</picture>*/}
            </a>
        </Link>
        <div className={styles.navLink}>
            <Link href={"/"}><a className="nostyle">
            <span className={styles.linkText}>Projects</span>
            <span className={styles.linkIcon}><House size={"2em"} /></span>
            </a></Link>
        </div>
        <div className={styles.navLink}>
            <Link href={"/me"}><a className="nostyle">
                <span className={styles.linkText}>About me</span>
                <span className={styles.linkIcon}><User size={"2em"} /></span>
            </a></Link>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.navIcon}><a className="nostyle" href={"/terminal"}><TerminalWindow size={"2em"} /></a></div>
        <ThemeSwitch />
    </nav>;
};

export default Navigation;
