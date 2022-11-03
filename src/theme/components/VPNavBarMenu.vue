<script setup>
import { useData } from "vitepress"
import VPNavBarMenuLink from "./VPNavBarMenuLink.vue"
import VPNavBarMenuGroup from "./VPNavBarMenuGroup.vue"

const { theme, frontmatter } = useData()
const { layout, createdAt, lastEditedAt } = frontmatter.value
const menuItems = []

if (layout === "home") {
  menuItems.push({ text: "Links", items: theme.value.friendLinks })
} else {
  if (createdAt) {
    const info = { text: createdAt.split("T")[0] }
    if (lastEditedAt) {
      info.items = [
        {
          text: lastEditedAt.split("T")[0],
          link: "",
          type: "edit",
        },
      ]
    } else {
      info.link = ""
    }
    menuItems.push(info)
  }
}
</script>

<template>
  <nav
    v-if="menuItems"
    aria-labelledby="main-nav-aria-label"
    class="VPNavBarMenu"
  >
    <span id="main-nav-aria-label" class="visually-hidden"
      >Main Navigation</span
    >
    <template v-for="item in menuItems" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>
