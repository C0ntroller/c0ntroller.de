import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, FileJs } from "phosphor-react";

import styles from "../../styles/Blog/ThemeSwitch.module.scss";

interface FadeProperties {
    sun?: string;
    moon?: string;
}

const ThemeSwitch: NextPage<{ size?: string }> = ({ size }) => {
    const [mounted, setMounted] = useState(false);
    const [fadeProps, setFadeProps] = useState<FadeProperties>({});
    const { theme, setTheme } = useTheme();

    // Will be run when the component is rendered.
    useEffect(() => {
        setMounted(true);
    }, []);

    const switchTheme = (theme: string) => {

        if (theme === "dark") setFadeProps({
                sun: styles.fadeIn,
                moon: styles.fadeOut
            });
        else setFadeProps({
            sun: styles.fadeOut,
            moon: styles.fadeIn
        });

        setTheme(theme);
    };

    if (!mounted) {
        return <div className={styles.switch} title="Theme switching needs JS to be enabled.">
            <FileJs size={size || "1.5em"} />
        </div>;
    }

    const sunClasses = fadeProps.sun || (theme === "dark" ? styles.selected : undefined);
    const moonClasses = fadeProps.moon || (theme === "light" ? styles.selected : undefined);

    return <div className={styles.switch}>
        <Sun size={size || "1.5em"} className={sunClasses} onClick={() => switchTheme("light")} />
        <Moon size={size || "1.5em"} className={moonClasses} onClick={() => switchTheme("dark")}  />
    </div>;

};

export default ThemeSwitch;