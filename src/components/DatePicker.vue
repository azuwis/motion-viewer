<template lang="pug">
v-menu
  v-text-field(
    slot="activator"
    v-model="date"
    :class="$style.datePicker"
    hide-details
    readonly
    single-line
  )
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
.iconButton {
  margin-left: 2px !important;
  margin-right: 2px !important;
}

.datePicker {
  max-width: 81px;
}
</style>
