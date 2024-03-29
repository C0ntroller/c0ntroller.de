import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Errorpage.module.css";

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
    const svg = `
<svg viewBox="30 -20 450 280" x="0" y="0">
    <!-- Box -->
    <polygon points="100,70 170,0 370,50 370,180" style="fill:#b58747;" />
    <defs>
        <linearGradient id="shadow_grad1" x1="50%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" style="stop-color:#876029;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
        </linearGradient>
    </defs>
    <defs>
        <linearGradient id="shadow_grad2" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" style="stop-color:#876029;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
        </linearGradient>
    </defs>
    <polygon points="100,70 170,0 330,100 300,120" style="fill:#876029;fill:url(#shadow_grad1)" />
    <polygon points="100,70 170,0 170,130 100,200, 100,70" style="fill:#876029;fill:url(#shadow_grad2)"/>
    <line x1="170" y1="0" x2="370" y2="50" style="stroke:#694f2c;stroke-width:5;stroke-linecap:round;"/>
    <line x1="170" y1="0" x2="170" y2="130" style="stroke:#694f2c;stroke-width:5;stroke-linecap:round;"/>
    <!-- Katzenschweif -->
    <path id="${styles.schweif}" d="M 280,120 C 250 100, 310 70, 320 20" style="fill:transparent;stroke:black;stroke-width:10;stroke-linecap:round" />                    
    <!-- Box-linien -->
    <polygon points="100,70 300,120 370,50 370,180 300,250 100,200" style="fill:#d19b4f;" />
    <g style="stroke:#694f2c;stroke-width:5;stroke-linecap:round;">
        <line x1="100" y1="70" x2="100" y2="200" />
        <line x1="100" y1="200" x2="300" y2="250" />
        <line x1="300" y1="250" x2="300" y2="120" />
        <line x1="100" y1="70" x2="300" y2="120" />
        <line x1="300" y1="120" x2="370" y2="50" />
        <line x1="300" y1="250" x2="370" y2="180" />
        <line x1="370" y1="50" x2="370" y2="180" />
    </g>
    <!-- Lappen-rechts -->
    <polygon points="300,120 350,150 420,80 370,50" style="fill:#b58747;" />
    <g style="stroke:#694f2c;stroke-width:5;stroke-linecap:round;">
        <line x1="300" y1="120" x2="370" y2="50" />
        <line x1="300" y1="120" x2="350" y2="150" />
        <line x1="350" y1="150" x2="420" y2="80" />
        <line x1="370" y1="50" x2="420" y2="80" />
    </g>
    <!-- Lappen-links -->
    <polygon points="100,70 50,100 120,30 170,0" style="fill:#b58747;" />
    <g style="stroke:#694f2c;stroke-width:5;stroke-linecap:round;">
        <line x1="100" y1="70" x2="170" y2="0" />
        <line x1="100" y1="70" x2="50" y2="100" />
        <line x1="50" y1="100" x2="120" y2="30" />
        <line x1="170" y1="0" x2="120" y2="30" />
    </g>
    <!-- Text -->
    <text x="120" y="120" style="font-size:4em;font-weight:bold;fill:#000000;transform:rotateX(40deg) rotateY(21deg);">${statusCode ? statusCode : "???"}</text>
    <!-- Killeraugen -->
    <ellipse cx="275" cy="150" rx="32" ry="20" style="fill:#291e0f;transform:rotateZ(12deg)" />
    <ellipse cx="266" cy="153" rx="7" ry="5" style="fill:#4a6b2a;transform:rotateZ(12deg)" />
    <ellipse cx="266" cy="153" rx="2" ry="5" style="fill:#000000;transform:rotateZ(12deg)" />
    <ellipse cx="285" cy="153" rx="7" ry="5" style="fill:#4a6b2a;transform:rotateZ(12deg)" />
    <ellipse cx="285" cy="153" rx="2" ry="5" style="fill:#000000;transform:rotateZ(12deg)" />
    <rect id="${styles.blinzeln}" width="40" height="22" x="255" y="139" style="fill:#291e0f;transform:rotateZ(12deg);" />
</svg>
`;

    return <>
    <Head><title>Error {statusCode} - c0ntroller.de</title></Head>
    <div className={styles.container}>
        <div id={styles.wrapper}>
            <div id={styles.box} dangerouslySetInnerHTML={{ __html: svg }}>
            </div>
            <div id={styles.errorText}>
                { statusCode === 404 ? "The site you requested could not be found." : "An error occurred." }
                <br />
                <Link href="/"><a>&gt; Back to the main page &lt;</a></Link>
            </div>
        </div>
    </div></>;
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;