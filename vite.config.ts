import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
  },
  base: "/suika-game/",
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    }
  }
});
