import type { NextPage } from "next";
import Head from "next/head";
import Navigation from "./Navigation";

interface ILayoutProps {
    title?: string;
}

const Layout: NextPage<ILayoutProps> = ({ title, children }) => {
    return <>
        <Head>
            <title>{title ?? "c0ntroller.de"}</title>
        </Head>
        <div id={"blogBody"}>
            <header>
                <Navigation />
            </header>
            <main>
                { children }
            </main>
        </div>
    </>;
};

export default Layout;