import { Github, Linkedin, Instagram, Discord, Steam } from "@icons-pack/react-simple-icons";

interface Social {
    name: string;
    url: string;
    icon: JSX.Element;
}

export const socials = (iconSize?: string, color?: string): Social[] => {
    iconSize = iconSize || "1em";
    console.log(iconSize);

    return [
        {
            name: "GitHub",
            url: "https://github.com/C0ntroller",
            icon: <Github size={iconSize} title="GitHub" color={color} />,
        }, {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/c0ntroller/",
            icon: <Linkedin size={iconSize} title="Linked" color={color} />,
        }, {
            name: "Instagram",
            url: "https://www.instagram.com/c0ntroller/",
            icon: <Instagram size={iconSize} title="Instagram" color={color} />,
        }, {
            name: "Steam",
            url: "https://steamcommunity.com/id/c0ntroller/",
            icon: <Steam size={iconSize} title="Steam" color={color} />,
        }, {
            name: "Discord",
            url: "https://discordapp.com/users/224208617820127233",
            icon: <Discord size={iconSize} title="Discord" color={color} />
        }
    ];
};

export default socials;