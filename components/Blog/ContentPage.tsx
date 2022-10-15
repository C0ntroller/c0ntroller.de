import type { NextPage } from "next";
import type { ProjectRender, DiaryRender } from "../../lib/content/types";
import DiaryPageSelector from "./DiaryPageSelector";

const ContentPage: NextPage<{ content: ProjectRender | DiaryRender }> = ({ content }) => {
    return (<>
        {content.type === "diary" ? <DiaryPageSelector title={content.title} pageSelected={0} name={content.name} pages={content.entries} /> : null}
        <div dangerouslySetInnerHTML={{ __html: content.html }}>
        </div>
        {content.type === "diary" ? <DiaryPageSelector title={content.title} pageSelected={0} name={content.name} pages={content.entries} bottom /> : null}
        </>);
};

export default ContentPage;