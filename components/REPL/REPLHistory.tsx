import { NextPage } from "next";
import styles from "../../styles/REPL/REPLHistory.module.css";

const REPLHistory: NextPage<{history: string[]}> = ({history}) => {
    return <div className={styles.container}>
        { history.map((value, idx) => <div className={styles.line} key={idx}>{value === "" ? "\u00A0" : value}</div>) }
    </div>;
};

export default REPLHistory;