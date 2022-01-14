import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import asciidoctor from "asciidoctor";
import styles from "../styles/ProjectModal.module.css";

interface ModalInput {
    project: string;
    visible: boolean;
    setVisible: CallableFunction;
}

const ad = asciidoctor();

const ProjectModal: NextPage<ModalInput> = ({ project, visible, setVisible }) => {
    const projectEmpty = "<div>Kein Projekt ausgewählt.</div>";
    const [projectData, setProjectData] = useState<string>(projectEmpty);
    const containerRef = useRef<HTMLDivElement>(null);

    const projectNotFoundHtml = `<div class="${"error"}">Sorry! There is no data for this project. Please check back later to see if that changed!</div>`;
    const projectServerErrorHtml = `<div class="${"error"}">Sorry! A server error happend when the project data was fetched!</div>`;

    useEffect(() => {
        if (project && project !== "") {
            // TODO
            // set Spinner
            fetch(`/api/get_project?projectName=${project}`).then((res) => {
                if (res.status === 404) setProjectData(projectNotFoundHtml);
                if (res.status !== 200) setProjectData(projectServerErrorHtml);
                res.text().then(data => {
                    try {
                        setProjectData(ad.convert(data).toString());
                    } catch {
                        setProjectData(projectServerErrorHtml);
                    }
                });
            });
        } else if (project === "") setProjectData(projectEmpty)
    }, [project])

    useEffect(() => {
        if (projectData && containerRef.current && projectData !== "") {
            containerRef.current.innerHTML = projectData;
        }

    }, [projectData, visible])

    const onEscClose = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            setVisible(false);
        }
    }
    
    if (!visible) return <></>

    return <div className={styles.modal} onKeyDown={onEscClose}>
        <div ref={containerRef} className={styles.modalContainer}>
        </div>
    </div>
}


export default ProjectModal;