<template lang="pug">
v-menu
  v-text-field(
    slot="activator"
    v-model="date"
    :class="$style.datePicker"
    prepend-icon="today"
    :prepend-icon-cb="gotoToday"
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
        this.$store.commit('setDate', date)
      }
    }
  },
  watch: {
    '$route' (route) {
      const date = route.params.date
      if (date) this.date = date
    },
    date (date) {
      this.$router.replace({name: 'date', params: {date}})
    }
  },
  created () {
    const date = this.$route.params.date
    if (date) {
      this.date = date
    } else {
      this.gotoToday()
    }
  },
  methods: {
    gotoToday () {
      this.$store.commit('setDateToday')
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
  max-width: 121px;
}
</style>
