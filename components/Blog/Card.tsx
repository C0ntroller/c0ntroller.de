import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Blog/Card.module.scss";

interface IContentCard {
    name: string;
    title: string;
    description: string;
    type: "project" | "diary";
}

const ContentCard: NextPage<IContentCard> = (content: IContentCard) => {
    return <Link href={`/blog/${content.type}/${content.name}`}><a className="nostyle">
            <div className={styles.card}>
                <h3 className={styles.title}>{content.title}</h3>
                <p className={styles.description}>{content.description}</p>
            </div>
        </a>
    </Link>;
};

export default ContentCard;