import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { GithubLogo, InstagramLogo, DiscordLogo } from "phosphor-react";
import REPL from "../components/REPL";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (<>
    <Head>
      <title>c0ntroller.de</title>
    </Head>
    <div className={styles.container}>
      <REPL />
      <div className={styles.footer}>
        <span className={styles.spacer} />
        <Link href="https://git.c0ntroller.de/c0ntroller/frontpage"><a>Source</a></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://git.c0ntroller.de/c0ntroller/frontpage/issues/new"><a>Bug?</a></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://github.com/C0ntroller" passHref><GithubLogo color="var(--repl-color)" weight="light" className={styles.iconLink} /></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://github.com/C0ntroller" passHref><InstagramLogo color="var(--repl-color)" weight="light" className={styles.iconLink} /></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://github.com/C0ntroller" passHref>
          <span className={styles.tooltip}>
            <DiscordLogo color="var(--repl-color)" weight="light" className={styles.iconLink} />
            <span className={styles.tooltiptext}>
              C0ntroller_Z#3883
            </span>
          </span>
        </Link>
        <span className={styles.spacer} />
      </div>
    </div>
  </>);
};

export default Home;
