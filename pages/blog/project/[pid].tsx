import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Blog/Layout";
import { generateContent } from "../../../lib/content/generateBackend";
import type { ContentList } from "../../../lib/content/types";

import contentList from "../../../public/content/list.json";

import styles from "../../../styles/Blog/Content.module.scss";

interface IContentRender {
  more?: string;
  repo?: string;
  title: string;
  html: string;
}

const Post: NextPage<{ content: IContentRender }> = ({ content }) => {
  return <Layout title={`${content.title} - c0ntroller.de`}>
            <div dangerouslySetInnerHTML={{ __html: content.html}}>
            </div>
    </Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pid } = context.query;
    const contentEntry = (contentList as ContentList).find((c) => c.name === pid && c.type === "project");


    if (!contentEntry) return { notFound: true };

    const contentHtml = await generateContent(contentEntry);

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

export default Post;