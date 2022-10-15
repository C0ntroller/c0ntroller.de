import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent, ChangeEventHandler } from "react";
import { useEffect } from "react";
import type { DiaryEntry } from "../../lib/content/types";

import styles from "../../styles/Blog/DiaryPageSelector.module.scss";

interface IContent {
    name: string;
    title: string;
    pageSelected: number
}

interface IContentNavBar extends IContent {
    mobile?: boolean;
    pages: string[];
}

interface IContentNav extends IContent {
    bottom?: boolean;
    pages: DiaryEntry[];
}

const PageSelectorBar: NextPage<IContentNavBar> = ({ pages, name, title, pageSelected, mobile }) => {
    const router = useRouter();

    // When we are on the main page no previous page exists, otherwise we need to check if the previous page is the main page
    const prevLink = pageSelected === 0 ? null : pageSelected > 1 ? `/blog/diary/${name}/${pageSelected - 1}` : `/blog/diary/${name}`;
    const nextLink = pageSelected < pages.length ? `/blog/diary/${name}/${pageSelected + 1}` : null;

    useEffect(() => {
        if (prevLink) router.prefetch(prevLink);
        if (nextLink) router.prefetch(nextLink);
    }, [nextLink, prevLink, router]);

    const onSelection: ChangeEventHandler = async (e: ChangeEvent) => {
        const selected = Number.parseInt((e.target as HTMLSelectElement).value) || 0;

        const link = selected === 0 ? `/blog/diary/${name}` : `/blog/diary/${name}/${selected}`;
        await router.push(link);
    };

    const prev = <span className={styles.leftSelectSpace}>{prevLink ? <Link href={prevLink}><a className={styles.barLink}>&lt; {pageSelected - 1 === 0 ? `${title} (Main Page)` : pages[pageSelected - 2]}</a></Link> : null}</span>;
    const next = <span className={styles.rightSelectSpace}>{nextLink ? <Link href={nextLink}><a className={styles.barLink}>{pages[pageSelected]} &gt;</a></Link> : null}</span>;

    const select = (
        <select onChange={onSelection} value={pageSelected}>
            <option key={-1} value={0}>Main page</option>
            {pages.map((entry, i) => <option key={i} value={i + 1}>{entry}</option>)}
        </select>
    );

    const classNames = mobile ? `${styles.barNav} ${styles.mobile}` : styles.barNav;

    return (
        <div className={classNames}>
            {prev}
            <span style={{visibility: prevLink ? "visible" : "hidden"}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            {select}
            <span style={{visibility: nextLink ? "visible" : "hidden"}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            {next}
        </div>
    );
};

const PageSelector: NextPage<IContentNav> = (content) => {
    const entries = content.pages.map(p => p.title);

    if (content.bottom) return <PageSelectorBar pages={entries} name={content.name} title={content.title} pageSelected={content.pageSelected} />;

    return (
        <div className={styles.nav}>
            <PageSelectorBar pages={entries} name={content.name} title={content.title} pageSelected={content.pageSelected} mobile />
            
            <div className={`${styles.sideNav} ${styles.desktop}`}>
                <Link href={`/blog/diary/${content.name}`}><a><h4>{content.title}</h4></a></Link>
                <ul>
                    {entries.map((e, idx) => <li key={idx}><Link href={`/blog/diary/${content.name}/${idx + 1}`}><a>{e}</a></Link></li>)}
                </ul>
            </div>
        </div>
    );
};

export default PageSelector;