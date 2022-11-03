import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import gen from "random-seed";
import Layout from "../components/Blog/Layout";
import type { ContentList, Project, Diary } from "../lib/content/types";
import ProjectCard from "../components/Blog/Card";
import { getContentList } from "../lib/content/generateBackend";

import styles from "../styles/Blog/Front.module.scss";


const Blog: NextPage<{ content: ContentList }> = ({content}) => {
    const clearDescription = (description: string) => {
        const linkRegex = /#%\{([a-z0-9 \.-\/:]*)\|([a-z0-9 \/:\.-]*)\}/ig;
        const cmdRegex = /%\{([a-z0-9 \.-\/:]*)}/ig;

        return description.replace(linkRegex, "$1").replace(cmdRegex, "\"$1\"");
    };

    const shuffleArray = (arr: any[]) => {
        // We want shuffle but only between days
        const date = new Date();
        const generator = gen.create(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);

        // https://stackoverflow.com/a/6274381
        for (let i = arr.length - 1; i > 0; i--) {
            const j = generator.intBetween(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        generator.done();
        return arr;
    };

    const generateCards = (type: string) => {
        return <div className={styles.contentList}>{
            (shuffleArray(content.filter(p => p.type === type)) as (Project|Diary)[])
            .map(p => 
            <ProjectCard key={p.name} title={p.title} description={clearDescription(p.desc.join(" "))} type={p.type} name={p.name} />
            )}
        </div>;
    };

    return <Layout>
        <h1>Hello there!</h1>
        <p className={styles.frontText}>
            Welcome to my website!<br/>
            You can find here blog entries about some projects I did and some diaries where I document progress.<br/>
            Interested in me? Visit the <Link href="/me"><a className="nocolor">About Me page</a></Link>, and you will find out more about me.<br/>
            On the right of the navigation, you will find what used to be my website - a CLI you can play around with.<br/><br/>
            Have fun!
        </p>
        <h2>Projects</h2>
        { generateCards("project") }
        <h2>Diaries</h2>
        { generateCards("diary") }
    </Layout>;

};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=600");

    return { props: { content: await getContentList() } };
};

export default Blog;