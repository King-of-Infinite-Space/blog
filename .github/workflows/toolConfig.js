// workflow config for king-of-infinite-space/gh-discussions-export
import { makeExcerpt, makeFilename, countWordsRounded } from './utils.js'

function parseHiddenFrontmatter(body) {
  const bodyLines = body.split('\n')
  const frontmatter = {}
  for (const line of bodyLines) {
    // <!-- key: value --> at the beginning of the file
    if (!(line.startsWith('<!--') && line.includes(':'))) {
      break
    }
    const kv = line.trim().slice(4, -3).split(':')
    let v = kv[1].trim()
    let k = kv[0].trim()
    if (!k.startsWith('_')) {
      k = '_' + k
    }
    frontmatter[k] = v
  }
  return frontmatter
}

export default {
  sourceRepo: 'king-of-infinite-space/thoughts',
  // in format of 'owner/repo'
  // if empty, will try to use env var GITHUB_REPOSITORY (e.g. provided by GitHub Actions)
  categoriesWhitelist: ['博文'],
  authorsWhitelist: [],
  // if empty, all are allowed

  outputDir: 'output',
  // relative to current working directory
  postSubDir: '',
  // relative to outputDir
  generateIndex: true,
  // whether to generate index.md (a list of posts and labels)
  postUseJson: false,
  homeUseJson: false,
  // if true, use json frontmatter instead of yaml for posts / homepage

  generateJsonFeed: false,
  generateRssFeed: false,
  // whether to generate feed

  formatFilename: (post) => {
    const hiddenFm = parseHiddenFrontmatter(post.body)
    return hiddenFm._filename || makeFilename(post)
  },

  formatPostBody: (post) => {
    // main content to write to md
    return post.body
  },

  extraFrontmatterPost: (post) => {
    // add entries to post frontmatter
    const wordCounts = countWordsRounded(post.bodyText)
    const hiddenFm = parseHiddenFrontmatter(post.body)
    // hidden frontmatter keys start with _
    const extraFrontmatter = {
      // excerpt: makeExcerpt(post.bodyText),
      countZH: wordCounts.zh,
      countEN: wordCounts.en,
      filename: hiddenFm._filename || makeFilename(post),
      // filename is used as href !!!
      // ...hiddenFm
    }
    if (post.labels.some((label) => label.includes('浅词拙句'))) {
      extraFrontmatter.fontFamily = 'serif'
    }

    return extraFrontmatter
  },

  extraFrontmatterIndex: (metadata) => {
    return {
      // add entries to index.md frontmatter (e.g. layout)
      layout: 'home',
      titleTemplate: false,
      fontFamily: 'serif',
    }
  },
}
