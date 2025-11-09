import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  root: "src", // папка з index.html
  build: {
    outDir: "../dist", // вихідна папка для збірки
  },
});
