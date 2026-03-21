import { execSync } from "child_process";
import { statSync } from "fs";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    try {
        const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
        // If  result is empty or undefined, fallback to fs stat
        if (!result || !result.toString().trim()) {
            throw new Error("No git history");
        } 
        file.data.astro.frontmatter.lastModified = result.toString();
        return;
    } catch (e) {
        // Ignore, fallback to fs stat
        const result = statSync(filepath);
        file.data.astro.frontmatter.lastModified = result.mtime.toISOString();
        return;
    }
  };
}
