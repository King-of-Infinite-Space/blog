import mdKatex from "markdown-it-katex"
import mdFootnote from "markdown-it-footnote"

export default {
  title: "the Universe in a Nutshell",
  themeConfig: {
    outline: [2, 5],
    outlineTitle: "目录",
  },
  markdown: {
    config: (md) => {
      md.set({ breaks: true }).use(mdKatex).use(mdFootnote)
    },
  },
}
