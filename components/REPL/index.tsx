import { useRef, useState } from "react";
import REPLInput from "./REPLInput";
import REPLHistory from "./REPLHistory";
import styles from "../../styles/REPL/REPLComplete.module.css";

const REPL = () => {
    const [history, manipulateHistory] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>();
    const onCommandExecuted = (result: string[]) => manipulateHistory(result.reverse().concat(history).slice(0, 1000));
    const onClearHistory = () => manipulateHistory([]);

    const focusInput = () => {
        if (inputRef.current) inputRef.current.focus();
    }

    return (<div className={styles.container}>
        <REPLHistory history={history} inputRef={inputRef} />
        <REPLInput historyCallback={onCommandExecuted} historyClear={onClearHistory} inputRef={inputRef} />
        <div style={{flexGrow: 2}} onClick={focusInput}></div>
    </div>);
};

export default REPL;