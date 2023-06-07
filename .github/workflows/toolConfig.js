// workflow config for king-of-infinite-space/gh-discussions-export
import { makeExcerpt, makeFilename, countWordsRounded } from "./utils.js"

function parseHiddenFrontmatter(body) {
  const bodyLines = body.split("\n")
  const frontmatter = {}
  for (const line of bodyLines) {
    if (line.startsWith("<!--") && line.includes(":")) {
      const kv = line.trim().slice(4, -3).split(":")
      let k = kv[0].trim()
      if (!k[0] == "_") k = "_" + k
      frontmatter[k] = kv[1].trim()
    } else {
      break
    }
  }
  return frontmatter
}

export default {
  sourceRepo: "king-of-infinite-space/thoughts",
  // in format of 'owner/repo'
  // if empty, will try to use env var GITHUB_REPOSITORY (e.g. provided by GitHub Actions)
  categoriesWhitelist: ["博文"],
  authorsWhitelist: [],
  // if empty, all are allowed

  outputDir: "output",
  // relative to current working directory
  postSubDir: "",
  // relative to outputDir
  generateIndex: true,
  // whether to generate index.md (a list of posts and labels)
  postUseJson: false,
  homeUseJson: false,
  // if true, use json frontmatter instead of yaml for posts / homepage

  generateJsonFeed: true,
  generateRssFeed: true,
  // whether to generate feed
  postsInFeed: 10,
  // number of posts to include in the feed

  formatFilename: post => {
    return post.filename
  },

  formatPostBody: post => {
    // main content to write to md
    return post.body
  },

  extraFrontmatterPost: post => {
    const wordCounts = countWordsRounded(post.bodyText)
    const hiddenFm = parseHiddenFrontmatter(post.body)
    return {
      // add entries to post frontmatter
      countZH: wordCounts.zh,
      countEN: wordCounts.en,
      // excerpt: makeExcerpt(post.bodyText),
      filename: hiddenFm._filename || makeFilename(post),
      // this is used as href !!!
      ...hiddenFm
    }
  },

  extraFrontmatterIndex: metadata => {
    return {
      // add entries to index.md frontmatter (e.g. layout)
      layout: "home",
      title: "Blog - the Universe in a Nutshell",
      titleTemplate: false,
    }
  },
}
