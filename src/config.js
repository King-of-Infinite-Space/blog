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
        icon: "feed",
        link: "/feed.rss",
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
  markdown: {
    config: (md) => {
      md.set({ breaks: true }).use(mdKatex).use(mdFootnote)
    },
  },
}
