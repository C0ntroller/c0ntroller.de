/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Blog/Navigation.module.scss";

const Navigation: NextPage<{}> = () => {
    return <nav className={styles.navigation}>
        <Link href={"/"} passHref>
            <picture>
                <source srcSet="/icon.png" type="image/png" />
                <img src="/icon.png" alt={"Website icon, a red eye"} className={styles.logo} />
            </picture>
        </Link>
        <div className={styles.navLink}>Projects</div>
        <div className={styles.navLink}>About me</div>
    </nav>;
};

export default Navigation;
