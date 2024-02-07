// @ts-ignore
import mdFootnote from "markdown-it-footnote"
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Cosmos Compressed",
  description: "gathering stardust",
  lang: "zh-CN",
  cleanUrls: true,
  srcDir: "posts",
  outDir: "dist",
  cacheDir: ".vitepress-cache",

  sitemap: {
    hostname: 'https://blog.lnfinite.space'
  },

  markdown: {
    math: true,
    config: (md) => {
      md.set({ breaks: true }).use(mdFootnote)
    },
  },

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌌</text></svg>",
      },
    ],
  ],

  themeConfig: {
    outline: [2, 5],
    outlineTitle: "目录",
    giscusOptions: {
      repo: "King-of-Infinite-Space/thoughts",
      repoId: "MDEwOlJlcG9zaXRvcnkxMzkwMTY3MjU=",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/King-of-Infinite-Space/thoughts/discussions/categories/%E5%8D%9A%E6%96%87?discussions_q=category%3A%E5%8D%9A%E6%96%87+sort%3Adate_created",
      },
      {
        icon: "feed",
        link: "/feed",
      },
    ],
    friendLinks: [
      {
        text: "卮言日出",
        link: "https://shadowquark.github.io/",
      },
      {
        text: "Do the Math - Energy and Growth",
        link: "https://dothemath.ucsd.edu/",
      },
    ],
  },
})
