import Icon from "@mdi/react";
import { mdiSeal, mdiRobotIndustrial } from "@mdi/js";

interface Achievement {
    description: string;
    icon: JSX.Element;
}

export const achievements = (size?: string): Achievement[] => [
    {
        "description": "Awarded with the Deutschlandstipendium",
        "icon": <Icon path={mdiSeal} size={size || "2em"} id="mdi_achievement_stip" />
    }, {
        "description": "Developer of the official testbed for Digital Twins in Industry 4.0 of the TU Dresden",
        "icon": <Icon path={mdiRobotIndustrial} size={size || "2em"} id="mdi_achievement_i40" />
    }
];

export default achievements;