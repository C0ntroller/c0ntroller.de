import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import asciidoctor from "asciidoctor";
import styles from "../styles/ProjectModal.module.css";
import type { Project, Diary } from "../lib/projects/types";
//import Link from "next/link";

interface ModalInput {
    project: Project|Diary|undefined;
    projectType: "project"|"diary";
    visible: boolean;
    setVisible: CallableFunction;
}

const ad = asciidoctor();

const ProjectModal: NextPage<ModalInput> = ({ project, projectType, visible, setVisible }) => {
    const projectEmpty = "<div>Kein Projekt ausgewählt.</div>";
    const [projectData, setProjectData] = useState<string>(projectEmpty);
    const containerRef = useRef<HTMLDivElement>(null);

    const projectNotFoundHtml = `<div class="${"error"}">Sorry! There is no data for this project. Please check back later to see if that changed!</div>`;
    const projectServerErrorHtml = `<div class="${"error"}">Sorry! A server error happend when the project data was fetched!</div>`;

    const generateFooter = (project: string, lastUpdate: string) => `<hr>
    <div id="footer">
<div id="footer-text">
Last updated: ${lastUpdate} | <a href="https://git.c0ntroller.de/c0ntroller/frontpage-projects/src/branch/senpai/${project}.adoc">Document source</a>
</div>
</div>
    `;

    useEffect(() => {
        if (project && project.name) {
            // TODO
            // set Spinner
            setProjectData("Loading...");
            fetch(`/api/${projectType === "diary" ? "diaries" : "projects"}/${project.name}`).then((res) => {
                if (res.status === 404) setProjectData(projectNotFoundHtml);
                if (res.status !== 200) setProjectData(projectServerErrorHtml);
                res.text().then(data => {
                    try {
                        const adDoc = ad.load(data, { attributes: { showtitle: true } });
                        setProjectData(adDoc.convert(adDoc).toString() + generateFooter(project.name, adDoc.getAttribute("docdatetime")));
                    } catch {
                        setProjectData(projectServerErrorHtml);
                    }
                });
            });
        } else if (typeof project === "undefined") setProjectData(projectEmpty);
    }, [project, projectType, projectEmpty, projectNotFoundHtml, projectServerErrorHtml]);

    useEffect(() => {
        if (projectData && containerRef.current && projectData !== "") {
            containerRef.current.innerHTML = projectData;
        }

    }, [projectData, visible]);

    if (!visible) return <></>;

    return <div className={styles.modal}>
        <a href="javascript:void(0);" onClick={() => setVisible(false)}>
            <div className={styles.modalClose}><div className={styles.modalCloseAlign}>X</div></div>
        </a>
        <div className={styles.modalContainer}>
            <div className={`${styles.modalText} asciidoc`} ref={containerRef}>
                
            </div>
        </div>
    </div>;
};


export default ProjectModal;