import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import type { Project, Diary } from "../../lib/content/types";

interface ModalFunctions {
    setVisible?: CallableFunction;
    setContent?: (content: Project| Diary) => void;
    setHtml?: (html: string) => void;
    onContentReady?: () => void;
}

const modalFunctions: ModalFunctions = {};
const ModalContext = createContext(modalFunctions);
const updateCallbacks = (callbacks: ModalFunctions) => Object.assign(modalFunctions, callbacks);
const useModalFunctions = () => ({modalFunctions: useContext(ModalContext), updateCallbacks});
const ModalFunctionProvider = (props: PropsWithChildren<{}>) => <ModalContext.Provider value={modalFunctions} {...props} />;

export { ModalFunctionProvider, useModalFunctions };