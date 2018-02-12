<template lang="pug">
div
  v-fab-transition
    v-btn#nav-fab-top(
      fab
      color="primary" dark small
      fixed bottom right
      @click.native="goToTop"
    )
      v-icon keyboard_arrow_up
  v-fab-transition
    v-btn(
      fab
      color="primary" dark small
      fixed bottom right
      @click.native="goToBottom"
    )
      v-icon keyboard_arrow_down
</template>

<script>
export default {
  name: 'NavFab',
  methods: {
    goToBottom () {
      window.scrollTo(0, document.body.scrollHeight)
    },
    goToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style>
#nav-fab-top {
  bottom: 64px;
}
</style>
