import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Icon from "@mdi/react";
import { mdiWhiteBalanceSunny, mdiWeatherNight, mdiLanguageJavascript } from "@mdi/js";

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
            <Icon path={mdiLanguageJavascript} size={size || "1.5em"} className={styles.placeHolder} />
        </div>;
    }

    const sunClasses = fadeProps.sun || (theme !== "light" ? styles.selected : undefined);
    const moonClasses = fadeProps.moon || (theme === "light" ? styles.selected : undefined);

    return <div className={styles.switch}>
        <div className={sunClasses} onClick={() => switchTheme("light")}><Icon path={mdiWhiteBalanceSunny} size={size || "1.5em"} /></div>
        <div className={moonClasses} onClick={() => switchTheme("dark")}><Icon path={mdiWeatherNight} size={size || "1.5em"} /></div>
    </div>;

};

export default ThemeSwitch;