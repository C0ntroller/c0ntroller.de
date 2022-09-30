import type { NextPage } from "next";
import styles from "../../styles/Blog/Card.module.scss";

const ProjectCard: NextPage<{ title: string, description: string }> = ({ title, description}) => {
    return <div className={styles.card}>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
    </div>;
};

export default ProjectCard;