import type { NextPage } from "next";
import Head from "next/head";
import type { ContentList } from "../lib/content/types";
import Navigation from "../components/Blog/Navigation";
import ProjectCard from "../components/Blog/Card";

import contentList from "../public/content/list.json";

import styles from "../styles/Blog/Front.module.scss";

const Blog: NextPage<{ content: ContentList }> = ({content}) => {
    const generateCards = (type: string) => {
        return <div className={styles.contentList}>{content.filter(p => p.type === type).map(p => <ProjectCard key={p.name} title={p.title} description={p.desc.join(" ")} type={p.type} name={p.name} />)}</div>;
    };

    return <>
        <Head>
            <title>c0ntroller.de</title>
        </Head>
        <div id={"blogBody"}>
            <header>
                <Navigation />
            </header>
            <main>
                <h1>Hello there!</h1>
                <p>Miaumiau Lorem ipsum</p>
                <h2>Projects</h2>
                { generateCards("project") }
                <h2>Diaries</h2>
                { generateCards("diary") }
            </main>
        </div>
    </>;

};

export async function getServerSideProps() {
    return { props: { content: contentList } };
}

export default Blog;