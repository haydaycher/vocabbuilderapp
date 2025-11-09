import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".", // явно корінь
  build: {
    outDir: "dist", // папка для збірки
  },
});
