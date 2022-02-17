import { NextPage } from "next";
import Link from "next/link";
import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef } from "react";
import styles from "../../styles/REPL/REPLHistory.module.css";

interface REPLHistoryParams {
    history: string[];
    inputRef: MutableRefObject<HTMLInputElement|null>;
}

const REPLHistory: NextPage<REPLHistoryParams> = ({history, inputRef}) => {
    const focusInput = () => {if (inputRef.current) inputRef.current.focus();};

    const forceInput = (e: BaseSyntheticEvent) => {
        const command = (e.target as HTMLSpanElement).innerHTML;
        if (inputRef.current) {
            inputRef.current.value = command;
            // TODO
            // Fix this as this currently doesn't work
            inputRef.current.dispatchEvent(new KeyboardEvent("keydown", {
                key: "Enter",
                keyCode: 13,
            }));
        }
        return true;
    };

    const makeLinks = (line: string) => {
        let idxStart = line.indexOf("#{");
        let idxSep = line.indexOf("|", idxStart);
        let idxEnd = line.indexOf("}", idxSep);
        if (idxStart === -1 || idxSep === -1 || idxEnd === -1) return [line];

        const result = [];

        while (idxStart !== -1 && idxSep !== -1 && idxEnd !== -1) {
            const linkText = line.substring(idxStart+2, idxSep);
            const linkHref = line.substring(idxSep+1, idxEnd);

            result.push(line.substring(0, idxStart));
            result.push(<Link href={linkHref}><a className={styles.link}>{linkText}</a></Link>);
            
            line = line.substring(idxEnd+1);
            idxStart = line.indexOf("#{");
            idxSep = line.indexOf("|", idxStart);
            idxEnd = line.indexOf("}", idxSep);
        }
        result.push(line.substring(idxEnd+1));
        return result;
    };

    const makeCommands = (line: string|JSX.Element, indexKey: number) => {
        if (typeof line !== "string") return line;

        let idxStart = line.indexOf("%{");
        let idxEnd = line.indexOf("}", idxStart);
        if (idxStart === -1 || idxEnd === -1) return line;

        const result = [];

        while (idxStart !== -1 && idxEnd !== -1) {
            const cmdText = line.substring(idxStart+2, idxEnd);

            result.push(line.substring(0, idxStart));
            result.push(<span className={styles.cmd} onClick={forceInput} key={`${indexKey}${line.length}${cmdText}`}>{cmdText}</span>);
            
            
            line = line.substring(idxEnd+1);
            idxStart = line.indexOf("%{");
            idxEnd = line.indexOf("}", idxStart);
        }
        result.push(line.substring(idxEnd+1));
        return result;
    };

    const parseLine = (line: string) => {
        if (line === "") return "\u00A0";
        
        const resultLinks = makeLinks(line);
        const resultAll = resultLinks.map(makeCommands);
        return resultAll.flat();
    };

    return <div className={styles.container} onClick={focusInput}>
        { history.map((value, idx) => <div className={styles.line} key={idx}>
                {parseLine(value)}
            </div>)
        }
        {<noscript>
            <div className={styles.line}>JavaScript must be enabled, else this site won&apos;t work.</div>
            <div className={styles.line}>This site doesn&apos;t use any trackers, so please enable JS!</div>
        </noscript>}
    </div>;
};

export default REPLHistory;