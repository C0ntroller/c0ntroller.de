import type { NextPage } from "next";
import Layout from "../components/Blog/Layout";
import type { ContentList } from "../lib/content/types";
import ProjectCard from "../components/Blog/Card";
import { getContentList } from "../lib/content/generateBackend";

import styles from "../styles/Blog/Front.module.scss";

const Blog: NextPage<{ content: ContentList }> = ({content}) => {
    const generateCards = (type: string) => {
        return <div className={styles.contentList}>{content.filter(p => p.type === type).map(p => <ProjectCard key={p.name} title={p.title} description={p.desc.join(" ")} type={p.type} name={p.name} />)}</div>;
    };

    return <>
        <Layout>
            <h1>Hello there!</h1>
            <p>Miaumiau Lorem ipsum</p>
            <h2>Projects</h2>
            { generateCards("project") }
            <h2>Diaries</h2>
            { generateCards("diary") }
        </Layout>
    </>;

};

export async function getServerSideProps() {
    return { props: { content: await getContentList() } };
}

export default Blog;