import { readFileSync } from "fs";
import { resolve } from "path";
import type { NextApiRequest, NextApiResponse } from "next";

interface IFileError {
    message: string;
    name: string;
    stack?: string;
    code: string;
    errno: number;
    syscall: string;
    path: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    if (req.method !== "GET") return res.status(405).end();
    if (!req.query.projectName) return res.status(400).end();

    const project = req.query.projectName;

    try {
        const path = resolve("./public", "projects", `${project}.md`)
        const data = readFileSync(path).toString();
        console.debug(`[API/get_project]\tRequest for ${project}`);
        res.status(200).send(data);
    } catch (err) {
        console.error(`[API/get_project]\tError in request for ${project}! Code: ${(err as IFileError).code}`);
        if ((err as IFileError).code === "ENOENT") res.status(404);
        else res.status(500);
    } finally {
        res.end();
    }
}
