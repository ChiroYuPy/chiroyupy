import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages (dépôt "chiroyupy") : https://chiroyupy.github.io/chiroyupy/
// Pour un site utilisateur (chiroyupy.github.io), mets VITE_BASE=/ au build.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/chiroyupy/",
  plugins: [react(), tailwindcss()],
});
