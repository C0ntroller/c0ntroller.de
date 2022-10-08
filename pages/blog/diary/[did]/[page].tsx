import type { GetServerSideProps, NextPage } from "next";
import DiaryPageSelector from "../../../../components/Blog/DiaryPageSelector";
import Layout from "../../../../components/Blog/Layout";
import { generateContent, getContentList } from "../../../../lib/content/generateBackend";
import type { ContentList, Diary } from "../../../../lib/content/types";

import styles from "../../../../styles/Blog/Content.module.scss";

interface IContentRender extends Diary {
    html: string;
    pageSelected: number;
}

const DiaryMain: NextPage<{ content: IContentRender }> = ({ content }) => {
    return <Layout title={`${content.entries[content.pageSelected - 1].title} - ${content.title} - c0ntroller.de`}>
        <div dangerouslySetInnerHTML={{ __html: content.html }}>
        </div>
        <DiaryPageSelector title={content.title} pageSelected={content.pageSelected} name={content.name} pages={content.entries.map(e => e.title)} bottom />
    </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { did, page } = context.query;
    const contentList = await getContentList();
    
    const contentEntry: Diary | undefined = (contentList as ContentList).find((c) => c.name === did && c.type === "diary") as Diary | undefined;

    if (!contentEntry || !page || typeof page !== "string") return { notFound: true };

    const contentHtml = await generateContent(contentEntry, Number.parseInt(page));

    return {
        props: {
            content: {
                ...contentEntry,
                html: contentHtml,
                pageSelected: Number.parseInt(page)
            }
        }
    };
};

export default DiaryMain;