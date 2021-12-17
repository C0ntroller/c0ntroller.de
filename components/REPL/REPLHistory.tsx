import { NextPage } from "next";
import { MutableRefObject } from "react";
import styles from "../../styles/REPL/REPLHistory.module.css";

interface REPLHistoryParams {
    history: string[];
    inputRef: MutableRefObject<HTMLInputElement|undefined>;
}

const REPLHistory: NextPage<REPLHistoryParams> = ({history, inputRef}) => {
    const focusInput = () => {if (inputRef.current) inputRef.current.focus();};

    return <div className={styles.container} onClick={focusInput}>
        { history.map((value, idx) => <pre className={styles.line} key={idx}>{value === "" ? "\u00A0" : value}</pre>) }
    </div>;
};

export default REPLHistory;