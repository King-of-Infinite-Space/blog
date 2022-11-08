<template>
  <div class="page">
    <div class="banner">
      <div class="slogan">
        {{ title }}
      </div>
    </div>
    <div class="content">
      <div class="posts">
        <PostCard
          v-for="post in articlesShown"
          v-bind:link="post.filename"
          v-bind:key="post.title"
          v-bind:title="post.title"
          v-bind:desc="post.excerpt"
          v-bind:labels="post.labels"
          v-bind:date="fmtDate(post.createdAt)"
          v-bind:countZH="post.countZH"
          v-bind:countEN="post.countEN"
        />
      </div>
      <div class="side">
        <div class="side-category">
          <!-- <LoadingCategory /> -->
          <Category
            v-for="label in labels"
            :key="label.name"
            :selected="isLabelSelected(label.name)"
            :name="label.name"
            :nArticles="label.count"
            @labelClicked="toggleLabel(label)"
          />
        </div>
        <div class="pager">
          <VPIconChevronLeft
            class="page-button left"
            v-bind:class="{ transparent: articlesPageNum <= 1 }"
            @click="articlesChangePage(-1)"
          />
          {{ articlesPageNum }} / {{ articlesMaxPage }}
          <VPIconChevronRight
            class="page-button right"
            v-bind:class="{
              transparent: articlesPageNum == articlesMaxPage,
            }"
            @click="articlesChangePage(1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress"
import { computed, onMounted, ref } from "vue"
import PostCard from "./PostCard.vue"
import Category from "./Category.vue"
import VPIconChevronLeft from "../components/icons/VPIconChevronLeft.vue"
import VPIconChevronRight from "../components/icons/VPIconChevronRight.vue"

const { site, frontmatter } = useData()

const title = site.value.title

const sumLabels = {
  name: "全部文章",
  count: frontmatter.value.posts.length,
  total: true,
}
let labels = [sumLabels, ...frontmatter.value.labels]

let selectedLabels = ref<string[]>([])
let articlesPageNum = ref(1)
const articlesPerPage = 5

const selectedArticles = computed(() => {
  if (selectedLabels.value.length == 0) {
    return frontmatter.value.posts
  }
  return frontmatter.value.posts.filter((post: { labels?: string[] }) =>
    haveSelectedLabels(post.labels)
  )
})

const articlesMaxPage = computed(() => {
  return Math.ceil(selectedArticles.value.length / articlesPerPage)
})

const articlesShown = computed(() => {
  let start = (articlesPageNum.value - 1) * articlesPerPage + 1
  let end = articlesPageNum.value * articlesPerPage
  return selectedArticles.value.slice(start - 1, end)
})

onMounted(() => {
  readSearchParams()
})

window.addEventListener("popstate", () => {
  readSearchParams()
})

function readSearchParams() {
  const searchParams = new URLSearchParams(window.location.search)
  selectedLabels.value = searchParams.get("label")?.split(",") ?? []
  articlesPageNum.value = parseInt(searchParams.get("page") ?? "1")
}

function updateSearchParams() {
  const searchParams = new URLSearchParams()
  if (selectedLabels.value.length > 0) {
    searchParams.set("label", selectedLabels.value.join(","))
  }
  if (articlesPageNum.value > 1) {
    searchParams.set("page", articlesPageNum.value.toString())
  }
  const paramString = searchParams.toString()
  if (paramString.length > 0) {
    window.history.pushState({}, "", `?${paramString}`)
  } else {
    window.history.pushState({}, "", window.location.pathname)
  }
}

function toggleLabel(label: { total?: boolean; name: string; count: number }) {
  if (label.total) {
    selectedLabels.value = []
  } else {
    const idx = selectedLabels.value.indexOf(label.name)
    if (idx > -1) {
      selectedLabels.value.splice(idx, 1)
    } else {
      selectedLabels.value.push(label.name)
    }
  }
  articlesPageNum.value = articlesMaxPage.value ? 1 : 0
  updateSearchParams()
}

function isLabelSelected(labelName: string) {
  return selectedLabels.value.includes(labelName)
}

function changePage(c: number, pn: number, pmax: number) {
  if (c < 0) {
    return Math.max(pn + c, Math.min(1, pmax))
  } else {
    return Math.min(pn + c, pmax)
  }
}
function articlesChangePage(c: number) {
  articlesPageNum.value = changePage(
    c,
    articlesPageNum.value,
    articlesMaxPage.value
  )
  updateSearchParams()
}

function haveSelectedLabels(postLabels: string[] | undefined) {
  if (postLabels) {
    for (const label of selectedLabels.value) {
      if (!postLabels.includes(label)) {
        return false
      }
    }
    return true
  }
  return false
}

function fmtDate(dateStr: string) {
  return dateStr.split("T")[0]
}
</script>

<style lang="stylus" scoped>

margin-percent = 10%

.page
  width 100%
  padding-left margin-percent*1.5
  padding-right margin-percent

.banner
  font-family var(--font-banner)
  margin 54px 0 48px
  color var(--my-gray-60)
  font-weight bold
  font-size 36px
  position relative
  cursor default

.content
  width 100%
  display flex
  justify-content flex-start

  .posts
    box-sizing border-box
    flex-grow 1

  .side
    box-sizing border-box
    min-width 110px
    margin-left 0.5 * margin-percent

  .side-category
    padding 0

.pager
  display: flex
  align-items: center
  justify-content: space-evenly
  flex-wrap: nowrap;
  margin-bottom: 15px
  margin-top: 15px
  cursor default
  user-select none
  color: var(--vp-c-text-2)
  fill var(--vp-c-text-2)

  .pager
    padding-bottom: 5px
    user-select: none

  .page-button
    height 1.2em
    cursor pointer

  .page-button.transparent
    opacity 0
    cursor default

@media screen and (max-width 576px)
  .page
    padding: 0 margin-percent*0.2
  .banner
    font-size 28px
    text-align center
    margin-top 24px
    margin-bottom 20px

  .content
    flex-wrap wrap
    flex-direction column-reverse

    .side
      width 100%
      padding 0
      margin-left 0px
      margin-bottom 8px

      .side-category
        padding 0px
        width: 100%
        overflow-x auto
        overflow-y hidden
        display flex

    .pager-container
      margin-bottom: 0px
      margin-top: 10px
</style>
