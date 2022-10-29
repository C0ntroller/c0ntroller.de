import type { NextPage } from "next";
import styles from "../styles/Spinner.module.scss";

const Spinner: NextPage<{size: number, color?: string}> = ({ size, color }) => {
    const diameterY = 300;
    const padding = 25;

    const rad = (angle: number) => angle * (Math.PI / 180);
    const side = (diameterY / 2) / Math.sin(rad(60));
    const x0 = side * Math.sin(rad(30));
    const vbSizeX = (2 * x0) + side + (2 * padding);
    const vbSizeY = diameterY + (2 * padding);

    return <div style={{height: size, width: size}} className={styles.spinnerContainer}><svg height="100%" width="100%" viewBox={`-${padding} -${padding} ${vbSizeX} ${vbSizeY}`} className={styles.spinner}>
        <polygon points={`${x0},${diameterY} 0,${diameterY/2} ${x0},0 ${x0+side},0 ${2*x0 + side},${diameterY/2} ${x0+side},${diameterY}`} className={styles.spinnerPath} style={{stroke: color}} />
    </svg></div>;
};

export default Spinner;