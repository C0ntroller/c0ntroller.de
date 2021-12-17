import { useRef, useState } from "react";
import REPLInput from "./REPLInput";
import REPLHistory from "./REPLHistory";

const REPL = () => {
    const [history, manipulateHistory] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>();
    const onCommandExecuted = (result: string[]) => manipulateHistory(result.reverse().concat(history).slice(0, 1000));

    return (<>
        <REPLHistory history={history} inputRef={inputRef} />
        <REPLInput historyCallback={onCommandExecuted} inputRef={inputRef} />
    </>);
};

export default REPL;