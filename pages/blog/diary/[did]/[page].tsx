import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../../../components/Blog/Layout";
import { generateContent } from "../../../../lib/content/generateBackend";
import type { ContentList } from "../../../../lib/content/types";

import contentList from "../../../../public/content/list.json";

import styles from "../../../../styles/Blog/Content.module.scss";

interface IContentRender {
    more?: string;
    repo?: string;
    title: string;
    html: string;
}

const DiaryMain: NextPage<{ content: IContentRender }> = ({ content }) => {
    return <Layout title={`${content.title} - c0ntroller.de`}>
        <div dangerouslySetInnerHTML={{ __html: content.html }}>
        </div>
    </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { did, page } = context.query;
    const contentEntry = (contentList as ContentList).find((c) => c.name === did && c.type === "diary");

    if (!contentEntry || !page || typeof page !== "string") return { notFound: true };

    const contentHtml = await generateContent(contentEntry, Number.parseInt(page));

    return {
        props: {
            content: {
                more: contentEntry.more || null,
                repo: contentEntry.repo || null,
                title: contentEntry.title,
                html: contentHtml
            }
        }
    };
};

export default DiaryMain;