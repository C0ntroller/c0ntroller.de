import type { NextPage } from "next";
import React from "react";
import { commandCompletion } from "../lib/commands";
import styles from "../styles/REPLInput.module.css";

const REPLInput: NextPage = () => {
    const typed = React.createRef<HTMLSpanElement>();
    const completion = React.createRef<HTMLSpanElement>();
    const [currentCmd, setCurrentCmd] = React.useState("");

    const replinOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const currentInput = (e.target as HTMLInputElement).value;
        const suggest = commandCompletion(currentInput);
        setCurrentCmd(suggest);
        if (typed.current) typed.current.innerHTML = currentInput;
        if (completion.current) completion.current.innerHTML = suggest.substring(currentInput.length);
    };

    const tabComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab" && currentCmd !== "") {
            e.preventDefault();
            (e.target as HTMLInputElement).value = currentCmd;
            if(typed.current) typed.current.innerHTML = currentCmd;
            if(completion.current) completion.current.innerHTML = "";
        }
        return false;
    };

    return <div className={styles.wrapper}>
        <input className={styles.in} type={"text"} onChange={replinOnChange} onKeyDown={tabComplete} spellCheck={"false"} />
        <span className={styles.completionWrapper}><span ref={typed} className={styles.typed}></span><span ref={completion} className={styles.completion}></span></span>
    </div>;
};

export default REPLInput;