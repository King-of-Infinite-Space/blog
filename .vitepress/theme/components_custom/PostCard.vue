<template>
  <div class="card">
    <a v-bind:href="link">
      <div class="card-title">{{ title }}</div>
      <div class="card-content">{{ desc }}...</div>
    </a>
    <div class="card-footer">
      <div class="footer-left">
        <div class="card-date">{{ date }}</div>
        <div class="card-count">
          <span v-if="countZH">{{ countZH }}字</span>
          <span v-if="countEN">{{ countEN }}words</span>
        </div>
      </div>
      <div class="footer-right">
        <div class="card-tag">
          <span v-for="label in labels" v-bind:key="label">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",

  props: {
    title: String,
    desc: String,
    labels: Array,
    date: String,
    countZH: Number,
    countEN: Number,
    number: Number,
    link: String,
  },
}
</script>

<style lang="stylus" scoped>

.card
  line-height 1.6
  padding-bottom: 10px
  border-bottom: 1.5px dotted var(--my-border-color)
  margin-bottom: 10px;
  cursor default

  a
    font-weight: normal
    outline: none
  a:hover .card-title
      font-weight: 600

  .card-footer
    color var(--vp-c-text-2)
    display flex
    justify-content space-between
    align-content center
    font-size 11px

    .footer-left, .footer-right
      display flex
      align-items center
      > div:not(:last-child)
        margin-right 2ch
      > div > span
        margin-right 1ch

    .card-tag
      flex-grow 1

  .card-title
    font-size 16px
    line-height 2

  .card-content
    font-size 12px
    padding-bottom 5px
    padding-top 5px
    color desc-color
</style>
