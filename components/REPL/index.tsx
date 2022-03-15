import { MutableRefObject, useEffect, useRef, useState } from "react";
import REPLInput from "./REPLInput";
import REPLHistory from "./REPLHistory";
import styles from "../../styles/REPL/REPLComplete.module.css";
import type { NextPage } from "next";

interface IREPLProps {
    inputRef: MutableRefObject<HTMLInputElement|null>;
    modalManipulation: {
        setModalVisible: CallableFunction;
        setModalProject: CallableFunction;
        setModalProjectType: CallableFunction;
    }
}

const REPL: NextPage<IREPLProps> = ({ inputRef, modalManipulation }) => {
    const date = new Date();
    const [history, manipulateHistory] = useState<string[]>([`cer0 0S - ${date.toLocaleDateString()}`]);
    const containerRef = useRef<HTMLDivElement>(null);
    const onCommandExecuted = (result: string[]) => manipulateHistory(result.reverse().concat(history).slice(0, 1000));
    const onClearHistory = () => manipulateHistory([]);

    const focusInput = () => {
        if (inputRef.current) inputRef.current.focus();
    };

    useEffect(() => {
        if(containerRef && containerRef.current) containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }, [history]);

    return (<div className={styles.container} ref={containerRef}>
        <REPLHistory history={history} inputRef={inputRef} />
        <REPLInput historyCallback={onCommandExecuted} historyClear={onClearHistory} inputRef={inputRef} modalManipulation={modalManipulation} />
        <div style={{flexGrow: 2}} onClick={focusInput}></div>
    </div>);
};

export default REPL;