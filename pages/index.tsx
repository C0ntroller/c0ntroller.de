import type { NextPage } from "next";
import REPL from "../components/REPL";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <REPL />
    </div>
  );
};

export default Home;
