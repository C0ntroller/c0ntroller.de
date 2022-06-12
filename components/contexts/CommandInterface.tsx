import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import { CommandInterface } from "../../lib/commands";
import type { Diary, Project, ContentList } from "../../lib/content/types";

interface CommandInterfaceCallbacks {
    setModalVisible?: (visible: boolean) => void; 
    setModalContent?: (content: Project | Diary, selectedPage?: number) => void;
    setModalHTML?: (html: string) => void;
}

const commandInterface = new CommandInterface();
const CommandContext = createContext(commandInterface);
const setCommandCallbacks = (callbacks: CommandInterfaceCallbacks) => commandInterface.callbacks = {...commandInterface.callbacks, ...callbacks};
const setContents = (content: ContentList) => commandInterface.content = content;
const useCommands = () => ({cmdContext: useContext(CommandContext), updateCallbacks: setCommandCallbacks, setContents});
const CommandsProvider = (props: PropsWithChildren<{}>) => <CommandContext.Provider value={commandInterface} {...props} />;

export { CommandsProvider, useCommands };