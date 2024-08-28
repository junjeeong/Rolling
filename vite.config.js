import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
  define: {
    "process.env.VITE_TINYMCE_API_KEY": JSON.stringify(
      process.env.VITE_TINYMCE_API_KEY
    ),
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
