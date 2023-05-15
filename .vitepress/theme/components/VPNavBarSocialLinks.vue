<script lang="ts" setup>
import { computed } from "vue"
import { useData } from "vitepress"
import VPSocialLinks from "./VPSocialLinks.vue"

const { theme, frontmatter } = useData()

const socialLinks = computed(() =>
  frontmatter.value.layout === "home"
    ? theme.value.socialLinks
    : [
        {
          icon: "github",
          link: frontmatter.value.url,
        },
      ]
)
</script>

<template>
  <VPSocialLinks
    v-if="socialLinks"
    class="VPNavBarSocialLinks"
    :links="socialLinks"
  />
</template>

<style scoped>
.VPNavBarSocialLinks {
  display: flex;
  align-items: center;
}
</style>
