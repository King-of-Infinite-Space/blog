import mdKatex from "markdown-it-katex"
import mdFootnote from "markdown-it-footnote"

export default {
  title: "the Universe in a Nutshell",
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
        icon: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>RSS</title><path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/></svg>',
        link: "/feed.rss",
      },
    ],
  },
  markdown: {
    config: (md) => {
      md.set({ breaks: true }).use(mdKatex).use(mdFootnote)
    },
  },
}
