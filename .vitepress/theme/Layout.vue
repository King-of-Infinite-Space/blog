<script setup lang="ts">
import { provide, watch } from "vue"
import { useData, useRoute } from "vitepress"
import { useSidebar, useCloseSidebarOnEscape } from "./composables/sidebar.js"
import VPNav from "./components/VPNav.vue"
import VPContent from "./components/VPContent.vue"
import VPFooter from "./components/VPFooter.vue"

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
} = useSidebar()

const route = useRoute()
watch(() => route.path, closeSidebar)

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

provide("close-sidebar", closeSidebar)

const { frontmatter } = useData()
</script>

<template>
  <div
    v-if="frontmatter.layout !== false"
    class="Layout"
    :class="{ isHome: frontmatter.layout === 'home', 'font-serif': frontmatter.fontFamily === 'serif' }"
  >
    <slot name="layout-top" />
    <VPNav>
      <template #nav-bar-title-before
        ><slot name="nav-bar-title-before"
      /></template>
      <template #nav-bar-title-after
        ><slot name="nav-bar-title-after"
      /></template>
      <template #nav-bar-content-before
        ><slot name="nav-bar-content-before"
      /></template>
      <template #nav-bar-content-after
        ><slot name="nav-bar-content-after"
      /></template>
    </VPNav>

    <VPContent>
      <template #doc-footer-before><slot name="doc-footer-before" /></template>
      <template #doc-before><slot name="doc-before" /></template>
      <template #doc-after><slot name="doc-after" /></template>

      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
      <template #aside-outline-before
        ><slot name="aside-outline-before"
      /></template>
      <template #aside-outline-after
        ><slot name="aside-outline-after"
      /></template>
      <template #aside-ads-before><slot name="aside-ads-before" /></template>
      <template #aside-ads-after><slot name="aside-ads-after" /></template>
    </VPContent>

    <VPFooter />
    <slot name="layout-bottom" />
  </div>
  <Content v-else />
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.Layout.isHome {
  flex-direction: column-reverse;
}
</style>
