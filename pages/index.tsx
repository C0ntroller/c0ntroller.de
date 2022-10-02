import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import type { ContentList } from "../lib/content/types";
import Navigation from "../components/Blog/Navigation";
import ProjectCard from "../components/Blog/Card";
import Spinner from "../components/Spinner";
import styles from "../styles/Blog/Front.module.scss";

const Blog: NextPage<{ content: ContentList }> = ({content}) => {
    //const { data: projectList, error } = useSWR("/content/list.json", (...args) => fetch(...args).then(res => res.json()));

    const generateCards = (type: string) => {
        //if (error) return <div>Error on fetching projects.</div>;
        //if (!projectList) return <Spinner size={200} color={"#ff0000"} />;
        /*else*/ return <div className={styles.contentList}>{content.filter(p => p.type === type).map(p => <ProjectCard key={p.name} title={p.title} description={p.desc.join(" ")} />)}</div>;
    };

    return <>
        <Head>
            <title>c0ntroller.de</title>
        </Head>
        <div className={styles.container}>
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
    const url = process.env.BASE_URL || "https://c0ntroller.de";
    const res = await fetch(`${url}/content/list.json`);
    const content = await res.json();

    return { props: { content } };
}

export default Blog;