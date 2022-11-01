<script setup lang="ts">
import { useRoute, useData } from "vitepress"
import { computed, provide, ref } from "vue"
import { useSidebar } from "../composables/sidebar.js"
import VPDocAside from "./VPDocAside.vue"
import VPDocFooter from "./VPDocFooter.vue"
import Giscus from "@giscus/vue"

const route = useRoute()
const { hasSidebar, hasAside } = useSidebar()

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
)

const { frontmatter } = useData()
const discussionNumber = frontmatter.value.url.split("/").pop()

const onContentUpdated = ref()
provide("onContentUpdated", onContentUpdated)
</script>

<template>
  <div
    class="VPDoc"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <div v-if="hasAside" class="aside">
      <div class="aside-curtain" />
      <div class="aside-container">
        <div class="aside-content">
          <VPDocAside>
            <template #aside-top>
              <slot name="aside-top" />
            </template>
            <template #aside-bottom>
              <slot name="aside-bottom" />
            </template>
            <template #aside-outline-before>
              <slot name="aside-outline-before" />
            </template>
            <template #aside-outline-after>
              <slot name="aside-outline-after" />
            </template>
            <template #aside-ads-before>
              <slot name="aside-ads-before" />
            </template>
            <template #aside-ads-after>
              <slot name="aside-ads-after" />
            </template>
          </VPDocAside>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <slot name="doc-before" />
        <main class="main">
          <Content
            class="vp-doc"
            :class="pageName"
            :onContentUpdated="onContentUpdated"
          />
        </main>
        <slot name="doc-footer-before" />
        <VPDocFooter />
        <slot name="doc-after" />
      </div>
      <Giscus
        id="comments-giscus"
        repo="King-of-Infinite-Space/thoughts"
        repoId="MDEwOlJlcG9zaXRvcnkxMzkwMTY3MjU="
        mapping="number"
        :term="discussionNumber"
        inputPosition="top"
      />
    </div>
  </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");

.VPDoc {
  padding: 32px 24px;
  width: 100%;
}

.VPDoc .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
}

.VPDoc .content,
.VPDoc #comments-giscus {
  max-width: 752px;
  padding-bottom: 64px;
}

.aside {
  position: fixed;
  display: none;
  right: 1%;
  max-width: 256px;
}

@media (min-width: 768px) {
  .VPDoc {
    padding-top: 48px;
  }
}

@media (min-width: 960px) {
  .VPDoc {
    padding: 32px 32px;
  }

  .aside {
    display: block;
  }
}

@media (min-width: 1280px) {
  .aside {
    right: 5%;
  }
}

.aside-container {
  position: sticky;
  top: 0;
  margin-top: calc(
    (var(--vp-nav-height-desktop) + var(--vp-layout-top-height, 0px)) * -1 -
      32px
  );
  padding-top: calc(
    var(--vp-nav-height-desktop) + var(--vp-layout-top-height, 0px) + 32px
  );
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.aside-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 224px;
  height: 32px;
  background: linear-gradient(transparent, var(--vp-c-bg) 70%);
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh -
      (var(--vp-nav-height-desktop) + var(--vp-layout-top-height, 0px) + 32px)
  );
  padding-bottom: 32px;
}
</style>
