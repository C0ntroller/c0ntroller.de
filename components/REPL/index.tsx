import { useState } from "react";
import REPLInput from "./REPLInput";
import REPLHistory from "./REPLHistory";

const REPL = () => {
    const [history, manipulateHistory] = useState<string[]>([]);
    const onCommandExecuted = (result: string[]) => manipulateHistory(result.reverse().concat(history).slice(0, 1000));

    return (<>
        <REPLHistory history={history} />
        <REPLInput historyCallback={onCommandExecuted} />
    </>);
};

export default REPL;