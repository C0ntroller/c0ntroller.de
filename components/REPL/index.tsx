import { MutableRefObject, useRef, useState } from "react";
import REPLInput from "./REPLInput";
import REPLHistory from "./REPLHistory";
import styles from "../../styles/REPL/REPLComplete.module.css";
import type { NextPage } from "next";

interface IREPLProps {
    inputRef: MutableRefObject<HTMLInputElement|undefined>;
    modalManipulation: {
        setModalVisible: CallableFunction;
        setModalProject: CallableFunction;
    }
}

const REPL: NextPage<IREPLProps> = ({ inputRef, modalManipulation }) => {
    const [history, manipulateHistory] = useState<string[]>([]);
    const onCommandExecuted = (result: string[]) => manipulateHistory(result.reverse().concat(history).slice(0, 1000));
    const onClearHistory = () => manipulateHistory([]);

    const focusInput = () => {
        if (inputRef.current) inputRef.current.focus();
    };

    return (<div className={styles.container}>
        <REPLHistory history={history} inputRef={inputRef} />
        <REPLInput historyCallback={onCommandExecuted} historyClear={onClearHistory} inputRef={inputRef} modalManipulation={modalManipulation} />
        <div style={{flexGrow: 2}} onClick={focusInput}></div>
    </div>);
};

export default REPL;