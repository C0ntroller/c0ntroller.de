import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Blog/Layout";
import DiaryPageSelector from "../../../components/Blog/DiaryPageSelector";
import { generateContent, getContentList } from "../../../lib/content/generateBackend";
import type { ContentList, Diary } from "../../../lib/content/types";

import styles from "../../../styles/Blog/Content.module.scss";

interface IContentRender extends Diary {
    html: string;
}

const DiaryMain: NextPage<{ content: IContentRender }> = ({ content }) => {
    return <Layout title={`${content.title} - c0ntroller.de`}>
        <DiaryPageSelector title={content.title} pageSelected={0} name={content.name} pages={content.entries.map(e => e.title)} />
        <div dangerouslySetInnerHTML={{ __html: content.html }}>
        </div>
        <DiaryPageSelector title={content.title} pageSelected={0} name={content.name} pages={content.entries.map(e => e.title)} bottom />
    </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { did } = context.query;
    const contentList = await getContentList();
    
    const contentEntry: Diary | undefined = (contentList as ContentList).find((c) => c.name === did && c.type === "diary") as Diary | undefined;

    if (!contentEntry) return { notFound: true };

    const contentHtml = await generateContent(contentEntry);

    return {
        props: {
            content: {
                ...contentEntry,
                html: contentHtml
            }
        }
    };
};

export default DiaryMain;