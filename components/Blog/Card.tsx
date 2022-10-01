import type { NextPage } from "next";
import styles from "../../styles/Blog/Card.module.scss";

const ProjectCard: NextPage<{ title: string, description: string }> = ({ title, description}) => {
    return <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
    </div>;
};

export default ProjectCard;