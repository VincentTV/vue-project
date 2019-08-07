<template>
  <div class="commodity-comment">
    <comment></comment>
  </div>
</template>

<script>
import comment from '../subcomponents/Comment.vue'
export default {
  components: {
    comment
  }
}
</script>

<style lang="scss">
.commodity-comment {
  padding: 10px;
}
</style>
