import type { NextPage } from "next";
import type { ProjectRender, DiaryRender } from "../../lib/content/types";
import DiaryPageSelector from "./DiaryPageSelector";

import styles from "../../styles/Blog/Content.module.scss";

const ContentPage: NextPage<{ content: ProjectRender | DiaryRender }> = ({ content }) => {
    return (<>
        {content.type === "diary" ? <DiaryPageSelector title={content.title} pageSelected={content.pageSelected} name={content.name} pages={content.entries} /> : null}
        <div className={styles.asciidoc} dangerouslySetInnerHTML={{ __html: content.html }}>
        </div>
        {content.type === "diary" ? <DiaryPageSelector title={content.title} pageSelected={content.pageSelected} name={content.name} pages={content.entries} bottom /> : null}
        </>);
};

export default ContentPage;