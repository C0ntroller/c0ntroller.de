import type { NextPage } from "next";
import { useRef, useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project, Diary } from "../lib/content/types";
import { useCommands } from "./contexts/CommandInterface";
import { generateContent, projectEmpty } from "../lib/content/generate";
import { useModalFunctions } from "./contexts/ModalFunctions";

const ProjectModal: NextPage = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [currentContent, setCurrentContent] = useState<Project | Diary | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [HTMLContent, setHTMLContent] = useState<string>(projectEmpty);

    const setModalContent = async (content: Project | Diary, selectedPage?: number) => {
        setCurrentContent(content);
        if (content.type === "diary") setCurrentPage(selectedPage === undefined ? 0 : selectedPage);
        setHTMLContent(await generateContent(content, selectedPage));
    };

    const { updateCallbacks: updateCmdCallbacks } = useCommands();
    const { updateCallbacks: updateModalCallbacks } = useModalFunctions();
    updateCmdCallbacks({ setModalVisible: setVisible, setModalContent, setModalHTML: setHTMLContent });
    updateModalCallbacks({ setVisible, setContent: setModalContent, setHtml: setHTMLContent });

    const containerRef = useRef<HTMLDivElement>(null);

    if (!visible) return <></>;

    const nextPageSelector = (() => {
        if (!currentContent || currentContent?.type !== "diary" || currentContent.entries.length === 0) return null;

        const prev = <span className={styles.leftSelectSpace}>{currentPage > 0 ? <a href="#" onClick={() => setModalContent(currentContent, currentPage - 1)}>&lt; {currentPage - 1 > 0 ? currentContent.entries[currentPage - 2].title : "Main page"}</a> : null}</span>;
        const next = <span className={styles.rightSelectSpace}>{currentPage < currentContent.entries.length ? <a href="#" onClick={() => setModalContent(currentContent, currentPage + 1)}>{currentContent.entries[currentPage].title} &gt;</a> : null}</span>;

        const select = (
            <select onChange={(e) => setModalContent(currentContent, Number.parseInt(e.target.value))} value={currentPage}>
                <option key={-1} value={0}>Main page</option>
                {currentContent.entries.map((entry, i) => <option key={i} value={i + 1}>{entry.title}</option>)}
            </select>
        );

        return <div className={styles.pageSelector}>{prev}{currentPage > 0 ? <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : null}{select}{currentPage < currentContent.entries.length ? <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : null}{next}</div>;
    })();

    return <div className={styles.modal}>
        <a onClick={() => setVisible(false)}>
            <div className={styles.modalClose}><div className={styles.modalCloseAlign}>X</div></div>
        </a>
        <div className={styles.modalContainer}>
            {nextPageSelector}
            <div className={`${styles.modalText} asciidoc`} ref={containerRef} dangerouslySetInnerHTML={{ __html: HTMLContent ? HTMLContent : projectEmpty }}>

            </div>
            {nextPageSelector}
        </div>
    </div>;
};


export default ProjectModal;