import { FaPhone } from "react-icons/fa";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	icon: FaPhone ,
	name: "SuHyuk's Website",
	description: "This is the first website by SuHyuk.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Todos",
			href: "/todos",
		}
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Todos",
			href: "/todos",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
