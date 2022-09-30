import type { NextPage } from "next";

const Navigation: NextPage<{}> = () => {
    return <nav>
        <div className="logo"></div>
        <div className="navLink">Projects</div>
        <div className="navLink">About me</div>
    </nav>;
};

export default Navigation;
