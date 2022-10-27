import type { NextPage } from "next";
import { Git } from "@icons-pack/react-simple-icons";
import Icon from "@mdi/react";
import { mdiWeb } from "@mdi/js";
import type { ProjectRender, DiaryRender } from "../../lib/content/types";
import DiaryPageSelector from "./DiaryPageSelector";

import styles from "../../styles/Blog/Content.module.scss";


const ContentPage: NextPage<{ content: ProjectRender | DiaryRender }> = ({ content }) => {
    return (<>
        {content.type === "diary" ? <DiaryPageSelector title={content.title} pageSelected={content.pageSelected} name={content.name} pages={content.entries} /> : null}
        <div className={styles.more}>
            {content.more ? <a href={content.more} className={"nostyle"}><Icon path={mdiWeb} size={"2em"} title="More" id={`mdi_content_more_link_${content.name}`} /></a> : null}
            {content.repo ? <a href={content.repo} className={"nostyle"}><Git size={"2em"} title={"Repository"} id={`mdi_content_repo_link_${content.name}`}  /></a> : null}
        </div>
        <div className={styles.asciidoc} dangerouslySetInnerHTML={{ __html: content.html }}>
        </div>
        {content.type === "diary" ? <DiaryPageSelector title={content.title} pageSelected={content.pageSelected} name={content.name} pages={content.entries} bottom /> : null}
        </>);
};

export default ContentPage;