import { defineConfig } from "vite"
export default defineConfig({
  ssr: {
    noExternal: ["@giscus/vue"],
    // error with top level import
    // workaround from https://github.com/vuepress/vuepress-next/issues/585
    // alternative solution https://github.com/vuejs/vitepress/issues/1579
  },
})
