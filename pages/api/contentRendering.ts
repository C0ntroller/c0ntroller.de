import type { NextApiRequest, NextApiResponse } from "next";
import { generateContent, getContentList } from "../../lib/content/generateBackend";
import type { APIReturn } from "../../lib/content/generateBackend";
import type { ContentList, Diary, Project } from "../../lib/content/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    if (!req.query || !req.query.name) return res.status(400).end();

    const list: ContentList = await getContentList();
    if (!list) return res.status(500).end();

    const content: Project | Diary | undefined = list.find((c) => c.name === req.query.name);
    if (!content) return res.status(404).end();

    const rendered = await generateContent(content, req.query.page ? parseInt(req.query.page as string) : undefined, true) as APIReturn;
    res.status(200).json(JSON.stringify(rendered));
    res.end();
}
