<script lang="ts" setup>
import { useData } from "vitepress"
import { isActive } from "../support/utils.js"
import VPLink from "./VPLink.vue"
import VPIconEdit from "./icons/VPIconEdit.vue"

defineProps<{
  item: any
}>()

const { page } = useData()
</script>

<template>
  <div class="VPMenuLink">
    <VPLink
      class="link"
      :class="{
        active: isActive(page.relativePath, item.activeMatch || item.link),
        hasLink: item.link,
      }"
      :href="item.link"
    >
      <VPIconEdit v-if="item.type === 'edit'" class="text-icon" />
      {{ item.text }}
    </VPLink>
  </div>
</template>

<style scoped>
.VPMenuGroup + .VPMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider-light);
  padding: 12px 12px 0;
}

.link {
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: background-color 0.25s, color 0.25s;
}

.link.hasLink:hover {
  /* color: var(--vp-c-brand); */
  background-color: var(--vp-c-bg-mute);
}

.dark .link.hasLink:hover {
  background-color: var(--vp-c-bg-soft);
}

.text-icon {
  margin-right: 0.3em;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
