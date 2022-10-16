import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Navigation from "./Navigation";

import styles from "../../styles/Blog/Blog.module.scss";

interface ILayoutProps {
    title?: string;
}

const Layout: NextPage<ILayoutProps> = ({ title, children }) => {
    return <>
        <Head>
            <title>{title ?? "c0ntroller.de"}</title>
        </Head>
        <div id={styles.blogBody}>
            <header>
                <Navigation />
            </header>
            <main>
                { children }
            </main>
            <footer>
                Copyright und so nen Stuff
            </footer>
        </div>
    </>;
};

export default Layout;