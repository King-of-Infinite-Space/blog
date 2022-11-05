<template>
  <div
    class="category"
    @click="$emit('labelClicked')"
    v-bind:class="{ selected: selected }"
  >
    <div class="category-text">
      <span>{{ name }}</span>
      <span class="subscript">{{ nArticles }}</span>
    </div>
    <!-- <div class="category-desc">{{ desc }}</div> -->
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    nArticles: Number,
    desc: String,
    link: String,
    selected: Boolean,
  },
}
</script>

<style lang="stylus" scoped>

a {
  font-weight: normal;
}

.category {
  user-select: none;
  border: 1px dashed var(--my-border-color);
  font-size: 13px;
  padding: 10px;
  line-height: 1;
  transition: all ease 0.2s;
  cursor: default;

  .category-text {
    display: flex;
    justify-content: center;
    align-items: baseline;
    position: relative;

    .subscript {
      white-space: nowrap;
      font-size: x-small;
      margin-left: 1px;
      top: -1px;
    }
  }
}

.selected {
  border: 1.5px solid var(--my-border-color);
}

@media screen and (min-width: 576px) {
  .category:hover {
    transform: scale(1.1, 1.1);
  }
}

@media screen and (max-width: 576px) {
  .category {
    margin-right: 3px;
    .category-text {
      white-space: nowrap;
    }
  }
}
</style>
