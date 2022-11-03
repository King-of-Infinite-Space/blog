<script lang="ts" setup>
import { useData } from "vitepress"
import VPNavBarTitle from "./VPNavBarTitle.vue"
import VPNavBarMenu from "./VPNavBarMenu.vue"
import VPNavBarTranslations from "./VPNavBarTranslations.vue"
import VPNavBarAppearance from "./VPNavBarAppearance.vue"
import VPNavBarSocialLinks from "./VPNavBarSocialLinks.vue"

const { frontmatter } = useData()

const middleText = frontmatter.value.createdAt?.split("T")[0] || ""
</script>

<template>
  <div
    class="VPNavBar"
    :class="{ 'bottom-nav': frontmatter.layout === 'home' }"
  >
    <div class="container">
      <VPNavBarTitle class="content-left">
        <template #nav-bar-title-before>
          <slot name="nav-bar-title-before" />
        </template>
        <template #nav-bar-title-after>
          <slot name="nav-bar-title-after" />
        </template>
      </VPNavBarTitle>

      <div class="content-right">
        <slot name="nav-bar-content-before" />
        <VPNavBarMenu class="menu" />
        <VPNavBarTranslations class="translations" />
        <VPNavBarSocialLinks class="social-links" />
        <VPNavBarAppearance class="appearance" />
        <slot name="nav-bar-content-after" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPNavBar {
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding: 0 24px;
  height: var(--vp-nav-height-mobile);
  transition: border-color 0.5s, background-color 0.5s;
  pointer-events: none;
}
.VPNavBar.bottom-nav {
  border-bottom: none;
  border-top: 1px solid var(--vp-c-divider-light);
}

@media (min-width: 768px) {
  .VPNavBar {
    padding: 0 32px;
  }
}

@media (min-width: 960px) {
  .VPNavBar {
    height: var(--vp-nav-height-desktop);
    border-bottom: 0;
  }

  .VPNavBar.has-sidebar .content-right {
    margin-right: -32px;
    padding-right: 32px;
    -webkit-backdrop-filter: saturate(50%) blur(8px);
    backdrop-filter: saturate(50%) blur(8px);
    background: rgba(255, 255, 255, 0.7);
  }

  .dark .VPNavBar.has-sidebar .content-right {
    background: rgba(36, 36, 36, 0.7);
  }

  @supports not (backdrop-filter: saturate(50%) blur(8px)) {
    .VPNavBar.has-sidebar .content-right {
      background: rgba(255, 255, 255, 0.95);
    }

    .dark .VPNavBar.has-sidebar .content-right {
      background: rgba(36, 36, 36, 0.95);
    }
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: right;
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  pointer-events: none;
}

.container :deep(*) {
  pointer-events: auto;
}

.content-left {
  flex-grow: 1;
}

.content-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.menu + .translations::before,
.menu + .appearance::before,
.menu + .social-links::before,
.translations + .appearance::before,
.social-links + .appearance::before {
  margin-right: 8px;
  margin-left: 8px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider-light);
  content: "";
}

.menu + .appearance::before,
.translations + .appearance::before {
  margin-right: 16px;
}

.social-links + .appearance::before {
  margin-right: 16px;
}
</style>
