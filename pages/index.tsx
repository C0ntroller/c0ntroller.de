import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { GithubLogo, InstagramLogo, DiscordLogo, GameController } from "phosphor-react";
import { useRef } from "react";
import REPL from "../components/REPL";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>();

  const focusInput = () => {
    console.log("Focus")
    if (inputRef.current) inputRef.current.focus();};
  
  return (<>
    <Head>
      <title>c0ntroller.de</title>
    </Head>
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.spacer} onClick={focusInput}>&nbsp;</span>
        <Link href="https://git.c0ntroller.de/c0ntroller/frontpage"><a>Source</a></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://git.c0ntroller.de/c0ntroller/frontpage/issues/new"><a>Bug?</a></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://github.com/C0ntroller" passHref><GithubLogo color="var(--repl-color)" className={styles.iconLink} /></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://www.instagram.com/c0ntroller/" passHref><InstagramLogo color="var(--repl-color)" className={styles.iconLink} /></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://steamcommunity.com/id/c0ntroller/" passHref><GameController color="var(--repl-color)" className={styles.iconLink} /></Link>
        <span className={styles.divider}>|</span>
        <Link href="https://discordapp.com/users/224208617820127233" passHref>
          <span className={styles.tooltip} style={{cursor: "pointer"}}>
            <DiscordLogo color="var(--repl-color)" className={styles.iconLink} />
            <span className={styles.tooltiptext}>
              C0ntroller_Z#3883
            </span>
          </span>
        </Link><span className={styles.spacer} onClick={focusInput}>&nbsp;</span>
      </div>
      <REPL inputRef={inputRef} />
    </div>
  </>);
};

export default Home;
