import { useCallback, useState } from "react";
import REPLInput from "./REPLInput";

const REPL = () => {
    const [history, manipulateHistory] = useState([]);
    return <REPLInput historyCallback={manipulateHistory} />;
};

export default REPL;