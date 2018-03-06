<template lang="pug">
v-snackbar(v-model="show") {{ message }}
  v-btn(
    flat
    color="accent"
    @click.native="show = false"
  ) Dismiss
</template>

<script>
export default {
  name: 'Snackbar',
  computed: {
    message () {
      return this.$store.state.toast.message
    },
    show: {
      get () {
        return this.$store.state.toast.show
      },
      set (show) {
        this.$store.commit('toast', { show })
      }
    }
  }
}
</script>
