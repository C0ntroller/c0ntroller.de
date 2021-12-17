import type { NextPage } from "next";
import Head from "next/head";
import REPL from "../components/REPL";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (<>
    <Head>
      <title>c0ntroller.de</title>
    </Head>
    <div className={styles.container}>
      <REPL />
    </div>
  </>);
};

export default Home;
