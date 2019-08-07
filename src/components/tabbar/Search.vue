<template>
  <div class="container">
    <h2>Search component</h2>
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'loging data...'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  color: lightslategray;
}
</style>
