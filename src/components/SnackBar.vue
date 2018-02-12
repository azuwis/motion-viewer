<template lang="pug">
v-snackbar(v-model="snackbar") {{ message }}
  v-btn(
    flat color="secondary"
    @click.native="snackbar = false"
  ) Dismiss
</template>

<script>
import EventBus from '@/EventBus'

export default {
  name: 'Snackbar',
  data: () => ({
    message: null,
    snackbar: null
  }),
  mounted () {
    EventBus.$on('toast', message => {
      this.message = message
      this.snackbar = true
    })
  }
}
</script>
