import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import type { ContentList } from "../lib/content/types";
import Navigation from "../components/Blog/Navigation";
import ProjectCard from "../components/Blog/Card";
import Spinner from "../components/Spinner";

const Blog: NextPage<{}> = () => {
    const { data: projectList, error } = useSWR("/content/list.json", (...args) => fetch(...args).then(res => res.json()));

    return <>
        <Head>
            <title>c0ntroller.de</title>
        </Head>
        <Navigation />
        <h1>Hello there!</h1>
        <p>Miaumiau Lorem ipsum</p>
        <h2>Projects</h2>
        {
            projectList ? (projectList as ContentList).filter(p => p.type === "project").map(p => <ProjectCard key={p.name} title={p.name} description={p.desc.join(" ")} />) : <Spinner size={200} />
        }
        <h2>Diaries</h2>
        {
            projectList ? (projectList as ContentList).filter(p => p.type === "diary").map(p => <ProjectCard key={p.name} title={p.name} description={p.desc.join(" ")} />) : <Spinner size={200} />
        }
    </>;

};

export default Blog;