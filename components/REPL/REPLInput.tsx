import type { NextPage } from "next";
import React, { MutableRefObject } from "react";
import { commandCompletion, executeCommand } from "../../lib/commands";
import styles from "../../styles/REPL/REPLInput.module.css";

interface REPLInputParams {
    historyCallback: CallableFunction;
    historyClear: CallableFunction;
    inputRef: MutableRefObject<HTMLInputElement|undefined>;
}

const REPLInput: NextPage<REPLInputParams> = ({historyCallback, historyClear, inputRef}) => {
    const typed = React.createRef<HTMLSpanElement>();
    const completion = React.createRef<HTMLSpanElement>();
    const [currentCmd, setCurrentCmd] = React.useState<string[]>([]);
    const [justTabbed, setJustTabbed] = React.useState<number>(0);

    const clearInput = (inputRef: HTMLInputElement) => {
        inputRef.value = "";
        if(typed.current) typed.current.innerHTML = "";
        if(completion.current) completion.current.innerHTML = "";
    }

    const replinOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement);
        const currentInput = input.value.toLowerCase();
        // Force lowercase
        input.value = currentInput;

        if (currentInput.includes(" ")) {
            // Command already typed
            input.maxLength = 524288; // Default value
            if (typed.current) typed.current.innerHTML = "";
            if (completion.current) completion.current.innerHTML = "";
            setCurrentCmd([]);
            return;
        } else {
            input.maxLength = 20;
            // Get completion hint
            const suggest = commandCompletion(currentInput);
            setCurrentCmd(suggest);
            if (suggest.length === 0) suggest.push("");
            if (typed.current) typed.current.innerHTML = currentInput;
            if (completion.current) completion.current.innerHTML = suggest[0].substring(currentInput.length);
        }        
    };

    const keyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement);
        if (e.key === "Tab" && currentCmd.length !== 0) {
            e.preventDefault();
            input.value = currentCmd[justTabbed % currentCmd.length];
            if(typed.current) typed.current.innerHTML = currentCmd[justTabbed % currentCmd.length];
            if(completion.current) completion.current.innerHTML = "";
            setJustTabbed(justTabbed + 1);
        } else setJustTabbed(0);

        if (e.key === "Enter") {
            e.preventDefault();
            const command = (e.target as HTMLInputElement).value
            if (command === "clear") {
                clearInput(input);
                historyClear();
                return false;
            }
            const result = executeCommand(command);
            clearInput(input);
            historyCallback(result);
        }

        if (e.key === "d" && e.ctrlKey) {
            e.preventDefault();
            const result = executeCommand("exit");
            clearInput(input);
            historyCallback(result);
        }

        if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            clearInput(input);
            historyClear();
        }

        return false;
    };

    return <div className={styles.wrapperwrapper}>
        <span className={styles.inputstart}>$&nbsp;</span>
        <div className={styles.wrapper}>
            <input ref={inputRef as MutableRefObject<HTMLInputElement>} className={styles.in} type={"text"} onChange={replinOnChange} onKeyDown={keyEvent} spellCheck={"false"} autoFocus maxLength={20} />
            <span className={styles.completionWrapper}><span ref={typed} className={styles.typed}></span><span ref={completion} className={styles.completion}></span></span>
        </div>
    </div>;
};

export default REPLInput;