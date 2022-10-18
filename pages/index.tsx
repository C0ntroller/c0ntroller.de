import type { NextPage } from "next";
import Layout from "../components/Blog/Layout";
import type { ContentList, Project, Diary } from "../lib/content/types";
import ProjectCard from "../components/Blog/Card";
import { getContentList } from "../lib/content/generateBackend";

import styles from "../styles/Blog/Front.module.scss";

// https://stackoverflow.com/a/6274381
function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const Blog: NextPage<{ content: ContentList }> = ({content}) => {
    const clearDescription = (description: string) => {
        const linkRegex = /#%\{([a-z0-9 \.-\/:]*)\|([a-z0-9 \/:\.-]*)\}/ig;
        const cmdRegex = /%\{([a-z0-9 \.-\/:]*)}/ig;

        return description.replace(linkRegex, "$1").replace(cmdRegex, "\"$1\"");
    };

    const generateCards = (type: string) => {
        return <div className={styles.contentList}>{
            (shuffle(content.filter(p => p.type === type)) as (Project|Diary)[])
            .map(p => 
            <ProjectCard key={p.name} title={p.title} description={clearDescription(p.desc.join(" "))} type={p.type} name={p.name} />
            )}
        </div>;
    };

    return <Layout>
        <h1>Hello there!</h1>
        <p>Miaumiau Lorem ipsum</p>
        <h2>Projects</h2>
        { generateCards("project") }
        <h2>Diaries</h2>
        { generateCards("diary") }
    </Layout>;

};

export async function getServerSideProps() {
    return { props: { content: await getContentList() } };
}

export default Blog;