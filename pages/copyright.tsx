import type { NextPage } from "next";
import Layout from "../components/Blog/Layout";

/*
- MIT License
- MDI (Material Design Icons) by Google, Apache License 2.0
- Simple Icons by Simple Icons Contributors, CC0 1.0 Universal
- SASS Logo by Sass team, CC BY-NC-SA 3.0
*/

const Copyright: NextPage = () => {
    return <Layout>
        <h1>Copyright</h1>
        <p>Unless otherwise stated, all content on this website is licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</p>
        <p>The logo and images of me are not licensed, so all rights are reserved.</p>
        <p>The <a className="nocolor" rel="noreferrer" target="_blank" href="https://materialdesignicons.com/">Material Design Icons</a> used on this website are licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a>.</p>
        <p>The <a className="nocolor" rel="noreferrer" target="_blank" href="">Simple Icons</a> used on this website are licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://creativecommons.org/publicdomain/zero/1.0/">Creative Commons Zero v1.0 Universal</a>.</p>
        <p>The <a className="nocolor" rel="noreferrer" target="_blank" href="https://sass-lang.com/">SASS Logo</a> used on this website is licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.</p>
    </Layout>;
};

export default Copyright;