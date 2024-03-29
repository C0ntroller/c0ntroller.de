import type { GetServerSideProps, NextPage } from "next";
import ContentPage from "../../../../components/Blog/ContentPage";
import Layout from "../../../../components/Blog/Layout";
import { generateContent, getContentList, prepareDOM } from "../../../../lib/content/generateBackend";
import type { ContentList, Diary, DiaryRender } from "../../../../lib/content/types";

const DiaryPage: NextPage<{ content: DiaryRender }> = ({ content }) => {
    return <Layout title={`${content.entries[content.pageSelected - 1].title} - ${content.title} - c0ntroller.de`}>
        <ContentPage content={content} />
    </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { did, page } = context.query;
    const contentList = await getContentList();
    
    const contentEntry: Diary | undefined = (contentList as ContentList).find((c) => c.name === did && c.type === "diary") as Diary | undefined;

    if (!contentEntry || !page || typeof page !== "string") return { notFound: true };

    const contentHtml = await generateContent(contentEntry, Number.parseInt(page)) as string;
    const contentPrepared = prepareDOM(contentHtml);

    context.res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=600");

    return {
        props: {
            content: {
                ...contentEntry,
                html: contentPrepared,
                pageSelected: Number.parseInt(page)
            }
        }
    };
};

export default DiaryPage;