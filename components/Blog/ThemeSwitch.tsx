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
    const { resolvedTheme, setTheme } = useTheme();

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
            <Icon path={mdiLanguageJavascript} size={size || "1.5em"} className={styles.placeHolder} id="mdi_themeswitch_noscript" />
        </div>;
    }

    const sunClasses = fadeProps.sun || (resolvedTheme === "dark" ? styles.selected : undefined);
    const moonClasses = fadeProps.moon || (resolvedTheme === "light" ? styles.selected : undefined);

    return <div className={styles.switch}>
        <div className={sunClasses} onClick={() => switchTheme("light")}><Icon path={mdiWhiteBalanceSunny} size={size || "1.5em"} title="Light theme" id="mdi_themeswitch_light" /></div>
        <div className={moonClasses} onClick={() => switchTheme("dark")}><Icon path={mdiWeatherNight} size={size || "1.5em"} title="Dark theme" id="mdi_themeswitch_dark" /></div>
    </div>;

};

export default ThemeSwitch;