import type { NextPage } from "next";
import Layout from "../components/Blog/Layout";

const Copyright: NextPage = () => {
    return <Layout>
        <h1>Copyright</h1>
        <p>Unless otherwise stated, all content on this website is licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> license.</p>
        <p>The logo (the &quot;eye&quot;) and images of me are not licensed, all rights are reserved.</p>
        <p>The <a className="nocolor" rel="noreferrer" target="_blank" href="https://materialdesignicons.com/">Material Design Icons</a> used on this website are licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a>.</p>
        <p>The <a className="nocolor" rel="noreferrer" target="_blank" href="">Simple Icons</a> used on this website are licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a> license.</p>
        <p>The <a className="nocolor" rel="noreferrer" target="_blank" href="https://sass-lang.com/">SASS Logo</a> used on this website is licensed under the <a className="nocolor" rel="noreferrer" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC BY-NC-SA 3.0</a> license.</p>
    </Layout>;
};

export default Copyright;