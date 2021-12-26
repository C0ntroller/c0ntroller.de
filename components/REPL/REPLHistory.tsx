import { NextPage } from "next";
import Link from "next/link";
import { MutableRefObject } from "react";
import styles from "../../styles/REPL/REPLHistory.module.css";

interface REPLHistoryParams {
    history: string[];
    inputRef: MutableRefObject<HTMLInputElement|undefined>;
}

const REPLHistory: NextPage<REPLHistoryParams> = ({history, inputRef}) => {
    const focusInput = () => {if (inputRef.current) inputRef.current.focus();};

    const parseLine = (line: string) => {
        if (line === "") return "\u00A0";
        
        let idxStart = line.indexOf("#{");
        let idxSep = line.indexOf("|", idxStart);
        let idxEnd = line.indexOf("}", idxSep);
        if (idxStart === -1 || idxSep === -1 || idxEnd === -1) return line;

        const result = []

        while (idxStart !== -1 && idxSep !== -1 && idxEnd !== -1) {
            const linkText = line.substring(idxStart+2, idxSep);
            const linkHref = line.substring(idxSep+1, idxEnd);

            result.push(line.substring(0, idxStart));
            result.push(<Link href={linkHref}><a className={styles.link}>{linkText}</a></Link>);
            

            line = line.substring(idxEnd+1)
            idxStart = line.indexOf("#{");
            idxSep = line.indexOf("|", idxStart);
            idxEnd = line.indexOf("}", idxSep);
        }
        result.push(line.substring(idxEnd+1))
        return result
    }

    return <div className={styles.container} onClick={focusInput}>
        { history.map((value, idx) => {
            return <div className={styles.line} key={idx}>
                {parseLine(value)}
            </div>}
        )}
    </div>;
};

export default REPLHistory;