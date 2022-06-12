import type { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import asciidoctor from "asciidoctor";
import styles from "../styles/ProjectModal.module.css";
import type { Project, Diary } from "../lib/content/types";
import { useCommands } from "./contexts/CommandInterface";
import { generateContent, projectEmpty } from "../lib/content/generate";
import { useModalFunctions } from "./contexts/ModalFunctions";
//import Link from "next/link";

const ProjectModal: NextPage = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [diaryPages, setDiaryPages] = useState<string[]>([]);
    const [content, setContent] = useState<string>(projectEmpty);

    const setModalContent = async (content: Project|Diary, selectedPage?: number) => {
        if (content.type === "diary") setDiaryPages(content.entries.map(entry => entry.title));
        setContent(await generateContent(content, selectedPage));
    };

    const { updateCallbacks: updateCmdCallbacks } = useCommands();
    const { updateCallbacks: updateModalCallbacks } = useModalFunctions();
    updateCmdCallbacks({ setModalVisible: setVisible, setModalContent});
    updateModalCallbacks({ setVisible, setContent: setModalContent, setHtml: setContent });

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (content && containerRef.current) {
            containerRef.current.innerHTML = content;
        }
    }, [content]);

    if (!visible) return <></>;

    return <div className={styles.modal}>
        <a onClick={() => setVisible(false)}>
            <div className={styles.modalClose}><div className={styles.modalCloseAlign}>X</div></div>
        </a>
        <div className={styles.modalContainer}>
        {
            // TODO
            // If diaryPages
            // Show page selector
        }
            <div className={`${styles.modalText} asciidoc`} ref={containerRef}>
                
            </div>
        </div>
    </div>;
};


export default ProjectModal;