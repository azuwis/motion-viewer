<template lang="pug">
v-menu
  v-btn(
    slot="activator"
    :class="$style.datePicker"
    flat
    large
  ) {{ date }}
  v-date-picker(no-title v-model="date")
</template>

<script>
export default {
  name: 'DatePicker',
  computed: {
    date: {
      get () {
        return this.$store.state.date
      },
      set (date) {
        this.$store.dispatch('updateVideos', { date })
      }
    }
  }
}
</script>

<style module>
.datePicker :global(.btn__content) {
  font-size: 20px;
  padding: 0 !important;
}
</style>
