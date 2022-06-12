import type { NextPage } from "next";
import { MutableRefObject, useState, createRef } from "react";
import { CommandInterface } from "../../lib/commands";
import styles from "../../styles/REPL/REPLInput.module.css";
import { useCommands } from "../contexts/CommandInterface";
import { useModalFunctions } from "../contexts/ModalFunctions";

interface REPLInputParams {
    historyCallback: CallableFunction;
    historyClear: CallableFunction;
    inputRef: MutableRefObject<HTMLInputElement|null>;
}

const REPLInput: NextPage<REPLInputParams> = ({historyCallback, historyClear, inputRef}) => {
    const typed = createRef<HTMLSpanElement>();
    const completion = createRef<HTMLSpanElement>();
    const [currentCmd, setCurrentCmd] = useState<string[]>([]);
    let [justTabbed, setJustTabbed] = useState<number>(0); // Because setters are not in sync but the events are too fast
    const [inCmdHistory, setInCmdHistory] = useState<number>(-1);
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [usrInputTmp, setUsrInputTmp] = useState<string>("");
    const {cmdContext: cmdIf} = useCommands();
    const { modalFunctions } = useModalFunctions();

    const setInput = (inputRef: HTMLInputElement, input: string) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        if (!nativeSetter) return;
        nativeSetter.call(inputRef, input);
        //if(typed.current) typed.current.innerHTML = input;
        //if(completion.current) completion.current.innerHTML = "";
        inputRef.dispatchEvent(new Event("input", { bubbles: true }));
        inputRef.dispatchEvent(new Event("change", { bubbles: true,  }));
    };

    const clearInput = (inputRef: HTMLInputElement) => {
        setInput(inputRef, "");
    };

    const replinOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement);
        const currentInput = input.value.toLowerCase();
        // Force lowercase
        input.value = currentInput;
        if (currentInput.trim() === "") input.value = "";

        if (currentInput.includes(" ")) {
            // Command already typed
            input.maxLength = 524288; // Default value
            if (typed.current) typed.current.innerHTML = "";
            if (completion.current) completion.current.innerHTML = "";
            setCurrentCmd([]);
            return;
        } else {
            input.maxLength = 20;
            if(justTabbed === 0) {
                // Get completion hint
                const suggest = CommandInterface.commandCompletion(currentInput);
                setCurrentCmd(suggest);
                
                if (suggest.length === 0) suggest.push("");
                if (typed.current) typed.current.innerHTML = currentInput;
                if (completion.current) completion.current.innerHTML = suggest[0].substring(currentInput.length);
            } else {
                if (typed.current) typed.current.innerHTML = "";
                if (completion.current) completion.current.innerHTML = "";
            }
        }        
    };

    const keyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement);
        if (e.key === "Tab") e.preventDefault();

        if (e.key === "Tab" && currentCmd.length !== 0) {
            const cmd = `${currentCmd[justTabbed % currentCmd.length]}${currentCmd.length === 1 ? " " : ""}`;
            setJustTabbed(justTabbed + 1);
            justTabbed += 1; // Because setters are not in sync but the events are too fast
            setInput(input, cmd);
            return false;
        } else setJustTabbed(0);

        switch (true) {
            case e.key === "Enter": {
                e.preventDefault();
                const command = (e.target as HTMLInputElement).value.trim();
                if (cmdHistory.at(-1) !== command) setCmdHistory(cmdHistory.concat([command]).splice(0, 100));
                clearInput(input);
                setInCmdHistory(-1);
                setCurrentCmd([]);
                if (command === "clear") {
                    historyClear();
                    return false;
                }
                const result = cmdIf.executeCommand(command);
                historyCallback(result);
                return false;
            }
            case e.key === "d" && e.ctrlKey: {
                e.preventDefault();
                const result = cmdIf.executeCommand("exit");
                clearInput(input);
                historyCallback(result);
                return false;
            }
            case e.key === "l" && e.ctrlKey: {
                e.preventDefault();
                clearInput(input);
                historyClear();
                return false;
            }
            case (e.key === "c" || e.key === "u") && e.ctrlKey: {
                e.preventDefault();
                clearInput(input);
                return false;
            }
            case e.key === "ArrowUp": {
                e.preventDefault();
                const idx = inCmdHistory + 1;
                if (idx < cmdHistory.length) {
                    if (inCmdHistory === -1) setUsrInputTmp(input.value);

                    const cmd = cmdHistory[cmdHistory.length - idx - 1];
                    setInput(input, cmd);
                    setInCmdHistory(idx);
                }
                return false;
            }
            case e.key === "ArrowDown": {
                e.preventDefault();
                const idx = inCmdHistory - 1;
                if (0 <= idx) {
                    const cmd = cmdHistory[cmdHistory.length - idx - 1];
                    setInput(input, cmd);
                    setInCmdHistory(idx);
                } else if (idx === -1) {
                    setInput(input, usrInputTmp);
                    setInCmdHistory(-1);
                }
                return false;
            }
        }
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