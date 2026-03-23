// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [],
  },
  image: {
    domains: ["cdn.sanity.io"],
  },
});
