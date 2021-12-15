import type { NextPage } from "next";
import React from "react";
import { commandCompletion, executeCommand } from "../../lib/commands";
import styles from "../../styles/REPL/REPLInput.module.css";

const REPLInput: NextPage<{historyCallback: CallableFunction}> = ({historyCallback}) => {
    const typed = React.createRef<HTMLSpanElement>();
    const completion = React.createRef<HTMLSpanElement>();
    const [currentCmd, setCurrentCmd] = React.useState<string[]>([]);
    const [justTabbed, setJustTabbed] = React.useState<number>(0);

    const replinOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const currentInput = (e.target as HTMLInputElement).value;
        const suggest = commandCompletion(currentInput);
        setCurrentCmd(suggest);
        if (suggest.length === 0) suggest.push("");
        if (typed.current) typed.current.innerHTML = currentInput;
        if (completion.current) completion.current.innerHTML = suggest[0].substring(currentInput.length);
    };

    const tabComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab" && currentCmd.length !== 0) {
            e.preventDefault();
            (e.target as HTMLInputElement).value = currentCmd[justTabbed % currentCmd.length];
            if(typed.current) typed.current.innerHTML = currentCmd[justTabbed % currentCmd.length];
            if(completion.current) completion.current.innerHTML = "";
            setJustTabbed(justTabbed + 1);
        } else setJustTabbed(0);

        if (e.key === "Enter") {
            const result = executeCommand((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
            if(typed.current) typed.current.innerHTML = "";
            if(completion.current) completion.current.innerHTML = "";
            historyCallback(result);
        }

        return false;
    };

    return <div className={styles.wrapper}>
        <input className={styles.in} type={"text"} onChange={replinOnChange} onKeyDown={tabComplete} spellCheck={"false"} />
        <span className={styles.completionWrapper}><span ref={typed} className={styles.typed}></span><span ref={completion} className={styles.completion}></span></span>
    </div>;
};

export default REPLInput;