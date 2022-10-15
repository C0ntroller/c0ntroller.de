import type { GetServerSideProps, NextPage } from "next";
import ContentPage from "../../../components/Blog/ContentPage";
import Layout from "../../../components/Blog/Layout";
import { generateContent, getContentList } from "../../../lib/content/generateBackend";
import type { ContentList, ProjectRender } from "../../../lib/content/types";

import styles from "../../../styles/Blog/Content.module.scss";

const Post: NextPage<{ content: ProjectRender }> = ({ content }) => {
    return <Layout title={`${content.title} - c0ntroller.de`}>
        <ContentPage content={content} />
    </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pid } = context.query;
    const contentList = await getContentList();

    const contentEntry = (contentList as ContentList).find((c) => c.name === pid && c.type === "project");


    if (!contentEntry) return { notFound: true };

    const contentHtml = await generateContent(contentEntry);

    return {
        props: {
            content: {
                more: contentEntry.more || null,
                repo: contentEntry.repo || null,
                title: contentEntry.title,
                html: contentHtml,
            }
        }
    };
};

export default Post;