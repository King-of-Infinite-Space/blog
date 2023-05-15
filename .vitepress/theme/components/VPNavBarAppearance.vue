<script lang="ts" setup>
import { useData } from 'vitepress'
import VPSwitchAppearance from './VPSwitchAppearance.vue'

const { site } = useData()
</script>

<template>
  <div v-if="site.appearance" class="VPNavBarAppearance">
    <VPSwitchAppearance />
  </div>
</template>

<style scoped>
.VPNavBarAppearance {
  display: flex;
  align-items: center;
}
</style>
