module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				//Common
				purple: "#703578",
				purple_dark: "#4A154B",
				google: "#4285F4",
				github: "#172B4D",

				// Login
				bg_login: "#fff",
				auth_links: "#0B4CA0",
				faded_login: "#616061",
				light_text_login: "#454245",
				border_login: "#BBBABB",
				hover_login:"#f8f8f8",

				// ChatModule
				chat_module_bg: "#1a1d21",
				chat_module_border: "#35373b",
				chat_module_hover_bg: "#222529",
				chat_module_text_1: "#d1d2d3",
				chat_module_text_2: "#a2a0ad",

				//DashBoard
				dark_header: "#121016",
				side_nav: "#19171d",
				text_color: "#d1d2d3",
				chat_section_color: "#1a1d21",
				hover_color: "#27242c",
				border_color: "#2a292e",

				// ChatModule
				chat_module_bg: "#1a1d21",
				chat_module_border: "#35373b",
				chat_module_hover_bg: "#222529",

				// Workspaces
				workspace_module_active_border:"#d1d2d3",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
