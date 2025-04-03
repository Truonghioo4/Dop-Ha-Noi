import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [react(), flowbiteReact()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"), // Đặt alias cho thư mục src
		},
	},
});