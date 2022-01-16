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

    try {
        const path = resolve("./public", "projects", "list.json");
        const data = readFileSync(path).toString();
        console.debug("[API/get_project]\tRequest for project list");
        res.status(200).send(data);
    } catch (err) {
        console.error(`[API/get_project]\tError in request for project list! Code: ${(err as IFileError).code}`);
        res.status(500);
    } finally {
        res.end();
    }
}
