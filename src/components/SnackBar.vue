<template lang="pug">
v-snackbar(v-model="snackbar") {{ message }}
  v-btn(
    flat
    color="accent"
    @click.native="snackbar = false"
  ) Dismiss
</template>

<script>
export default {
  name: 'Snackbar',
  data: () => ({
    message: null,
    snackbar: null
  }),
  methods: {
    toast (message) {
      this.message = message
      this.snackbar = true
    }
  }
}
</script>
