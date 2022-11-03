import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Blog/Layout";
import ContentPage from "../../../components/Blog/ContentPage";
import { generateContent, getContentList, prepareDOM } from "../../../lib/content/generateBackend";
import type { ContentList, DiaryRender, Diary } from "../../../lib/content/types";

const DiaryMain: NextPage<{ content: DiaryRender }> = ({ content }) => {
    return <Layout title={`${content.title} - c0ntroller.de`}>
        <ContentPage content={content} />
    </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { did } = context.query;
    const contentList = await getContentList();
    
    const contentEntry: Diary | undefined = (contentList as ContentList).find((c) => c.name === did && c.type === "diary") as Diary | undefined;

    if (!contentEntry) return { notFound: true };

    const contentHtml = await generateContent(contentEntry) as string;
    const contentPrepared = prepareDOM(contentHtml);

    context.res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=600");

    return {
        props: {
            content: {
                ...contentEntry,
                html: contentPrepared,
                pageSelected: 0
            }
        }
    };
};

export default DiaryMain;