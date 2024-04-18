<script setup lang="ts">
import { useRoute, useData, onContentUpdated } from 'vitepress'
import { computed, provide, ref, onMounted } from 'vue'
import { useSidebar } from '../composables/sidebar.js'
import VPDocAside from './VPDocAside.vue'
import VPDocFooter from './VPDocFooter.vue'
import Giscus from '@giscus/vue'
import { useFloating, offset, flip } from '@floating-ui/vue'
import { createLogicalAnd } from 'typescript'

const route = useRoute()
const { hasSidebar, hasAside } = useSidebar()

const pageName = computed(() =>
  route.path.replace(/[./]+/g, '_').replace(/_html$/, '')
)

const { theme, frontmatter, isDark } = useData()
const discussionNumber = computed(
  () => frontmatter.value.number ?? frontmatter.value.url.split('/').pop()
)
const { repo, repoId } = theme.value.giscusOptions

const floatingHTML = ref()
const floatingReference = ref()
const floating = ref()
const { floatingStyles } = useFloating(floatingReference, floating, {
  middleware: [offset(8), flip()],
})

function showPopup(sourceEl) {
  const footnoteId = sourceEl.id.replace(/^fnref/, 'fn')
  const footnote = document.getElementById(footnoteId).cloneNode(true)
  // remove return links
  footnote.querySelectorAll('a.footnote-backref').forEach((el) => {
    el.remove()
  })
  floatingHTML.value = footnote?.innerHTML

  const content = document.querySelector('.container > .content')
  floatingReference.value = {
    getBoundingClientRect() {
      const contentRect = content.getBoundingClientRect()
      const aRect = sourceEl.getBoundingClientRect()
      return {
        width: contentRect.width,
        height: aRect.height,
        x: contentRect.x,
        y: aRect.y,
        top: aRect.top,
        left: contentRect.left,
        right: contentRect.right,
        bottom: aRect.bottom,
      }
    },
  }
}

function enablePopUp() {
  // click outside to close
  document.body.addEventListener('click', () => {
    floatingHTML.value = null
  })
  // https://github.com/markdown-it/markdown-it-footnote

  document.querySelectorAll('sup.footnote-ref > a').forEach((el) => {
    el.setAttribute('href', 'javascript:;')
    // preventDefault doesn't prevent jumping (probably due to router)
    // use this hack

    el.addEventListener('click', (ev) => {
      console.log('click')
      ev.preventDefault()
      ev.stopPropagation()
      // second click to close
      if (floatingHTML.value) {
        floatingHTML.value = null
        return
      }
      showPopup(el)
    })
  })
  window.addEventListener('hashchange', (ev) => {
    if (ev.newURL.match(/#fnref\d+$/)) {
      console.log('history replace')
      window.history.replaceState(null, '', ev.newURL.replace('#fnref', '#fn'))
      window.history.pushState(null, '', ev.newURL)
      // make back button jump back to the footnote
    }
  })
}


onMounted(() => {
  console.log('mounted')
  enablePopUp()
  // sometimes back button makes it disabled, but cant reliably reproduce
  // maybe only in dev mode?
})
</script>

<template>
  <div
    class="VPDoc"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <div
      ref="floating"
      v-if="floatingHTML"
      v-html="floatingHTML"
      :style="floatingStyles"
      id="floating"
      class="vp-doc"
      onclick="event.stopPropagation()"
    ></div>
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
          <div class="title vp-doc">
            <h1>{{ frontmatter.title }}</h1>
          </div>
          <Content class="vp-doc" :class="pageName" />
        </main>
        <slot name="doc-footer-before" />
        <VPDocFooter />
        <slot name="doc-after" />
      </div>
      <Giscus
        host="https://giscus.app"
        id="giscus"
        :repo="repo"
        :repoId="repoId"
        mapping="number"
        :term="discussionNumber"
        inputPosition="top"
        :theme="isDark ? 'dark' : 'light'"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 2.5rem;
}
.title h1 {
  text-align: center;
  font-weight: normal;
}

.VPDoc {
  padding: 32px 24px;
  width: 100%;
}

.container {
  margin: 0 auto;
  width: 100%;
}

.content {
  padding-bottom: 64px;
  margin: 0 auto;
  max-width: 784px;
}

#giscus {
  display: block;
  margin: 0 auto;
  max-width: 784px;
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
    (var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1 - 32px
  );
  padding-top: calc(
    var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 32px
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
    100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 32px)
  );
  padding-bottom: 32px;
}

#floating {
  position: absolute;
  left: 0;
  top: 0;
  width: 90%;
  max-width: 650px;
  padding: 0.5em;
  box-sizing: border-box;
  z-index: 100;
  font-size: 90%;
  background-color: var(--vp-c-bg-soft);
  border: 1.5px solid var(--my-border-color);
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
</style>
<style>
/* global styles */
#floating > p {
  margin: 0;
  line-height: 1.6em;
}
.vp-doc section.footnotes {
  font-size: 90%;
}
</style>
