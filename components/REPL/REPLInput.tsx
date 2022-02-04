import type { NextPage } from "next";
import useSWR from "swr";
import { MutableRefObject, useState, createRef, useEffect } from "react";
import { CommandInterface } from "../../lib/commands";
import styles from "../../styles/REPL/REPLInput.module.css";
import { Project } from "../../lib/projects/types";

interface REPLInputParams {
    historyCallback: CallableFunction;
    historyClear: CallableFunction;
    inputRef: MutableRefObject<HTMLInputElement|undefined>;
    modalManipulation: {
        setModalVisible: CallableFunction;
        setModalProject: CallableFunction;
    }
}

async function fetchProjects(endpoint: string): Promise<Project[]> {
    const res = await fetch(endpoint);
    return res.json();
}

const REPLInput: NextPage<REPLInputParams> = ({historyCallback, historyClear, inputRef, modalManipulation}) => {
    const typed = createRef<HTMLSpanElement>();
    const completion = createRef<HTMLSpanElement>();
    const [currentCmd, setCurrentCmd] = useState<string[]>([]);
    const [justTabbed, setJustTabbed] = useState<number>(0);
    const [inCmdHistory, setInCmdHistory] = useState<number>(-1);
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [usrInputTmp, setUsrInputTmp] = useState<string>("");
    const [cmdIf, setCmdIf] = useState<CommandInterface>(new CommandInterface(modalManipulation, []));
    const { data: projects, error: projectsError } = useSWR("/api/projects?swr=1", fetchProjects);

    const setInput = (inputRef: HTMLInputElement, input: string) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        if (!nativeSetter) return;
        nativeSetter.call(inputRef, input);
        //if(typed.current) typed.current.innerHTML = input;
        //if(completion.current) completion.current.innerHTML = "";
        const event = new Event("input", { bubbles: true });
        inputRef.dispatchEvent(event);
    };

    const clearInput = (inputRef: HTMLInputElement) => {
        setInput(inputRef, "");
    };

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
            const suggest = CommandInterface.commandCompletion(currentInput);
            setCurrentCmd(suggest);
            if (suggest.length === 0) suggest.push("");
            if (typed.current) typed.current.innerHTML = currentInput;
            if (completion.current) completion.current.innerHTML = suggest[0].substring(currentInput.length);
        }        
    };

    const keyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement);
        if (e.key === "Tab") {
            e.preventDefault();
        }
        if (e.key === "Tab" && currentCmd.length !== 0) {
            const cmd = `${currentCmd[justTabbed % currentCmd.length]}${currentCmd.length === 1 ? " " : ""}`;
            setInput(input, cmd);
            setJustTabbed(justTabbed + 1);
            return false;
        } else setJustTabbed(0);

        if (e.key === "Enter") {
            e.preventDefault();
            const command = (e.target as HTMLInputElement).value;
            setCmdHistory(cmdHistory.concat([command]).splice(0, 100));
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

        if (e.key === "d" && e.ctrlKey) {
            e.preventDefault();
            const result = cmdIf.executeCommand("exit");
            clearInput(input);
            historyCallback(result);
            return false;
        }

        if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            clearInput(input);
            historyClear();
            return false;
        }

        if ((e.key === "c" || e.key === "u") && e.ctrlKey) {
            e.preventDefault();
            clearInput(input);
            return false;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            const idx = inCmdHistory + 1;
            if (idx < cmdHistory.length) {
                if (inCmdHistory === -1) setUsrInputTmp(input.value);

                const cmd = cmdHistory[cmdHistory.length - idx - 1];
                setInput(input, cmd);
                setInCmdHistory(idx);
            }
        }

        if (e.key === "ArrowDown") {
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
        }
    };

    useEffect(() => {
        if (!projectsError && projects) setCmdIf(new CommandInterface(modalManipulation, projects));
        // In any other case we just don't create another interface. 
    }, [projects, projectsError, modalManipulation]);

    return <div className={styles.wrapperwrapper}>
        <span className={styles.inputstart}>$&nbsp;</span>
        <div className={styles.wrapper}>
            <input ref={inputRef as MutableRefObject<HTMLInputElement>} className={styles.in} type={"text"} onChange={replinOnChange} onKeyDown={keyEvent} spellCheck={"false"} autoFocus maxLength={20} />
            <span className={styles.completionWrapper}><span ref={typed} className={styles.typed}></span><span ref={completion} className={styles.completion}></span></span>
        </div>
    </div>;
};

export default REPLInput;