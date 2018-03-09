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
  },
  watch: {
    '$route' (route) {
      this.date = route.params.date
    },
    date (date) {
      this.$router.push({ params: { date, time: null } })
    }
  },
  created () {
    const date = this.$route.params.date
    if (date) {
      this.date = date
    } else if (this.date) {
      this.$router.replace({ params: { date: this.date } })
    } else {
      this.gotoToday()
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
