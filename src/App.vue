<template lang="pug">
v-app#app
  nav-drawer(ref="navDrawer")
  v-toolbar(
   app
   color="primary" dark dense
   fixed
  )
    v-menu
      v-text-field(
        prepend-icon="today"
        :prepend-icon-cb="gotoToday"
        hide-details readonly single-line
        slot="activator"
        :loading="loading ? 'success' : false"
        v-model="date"
      )#date-picker
      v-date-picker(no-title v-model="date")
    v-spacer
    v-btn(
      icon
      @click.stop="$refs.navDrawer.drawer = true"
    )
      v-icon more_vert
  v-content
    router-view(@loading="val => loading = val")
  snack-bar
</template>

<script>
import NavDrawer from '@/components/NavDrawer.vue'
import SnackBar from '@/components/SnackBar.vue'
import {getDate} from '@/utils'

export default {
  components: {
    NavDrawer,
    SnackBar
  },
  data: () => ({
    date: null,
    loading: false
  }),
  watch: {
    date (date) {
      this.$router.push({name: 'date', params: {date}})
      localStorage.setItem('date', date)
    }
  },
  methods: {
    gotoToday () {
      this.date = getDate(new Date())
    }
  },
  created () {
    const date = localStorage.getItem('date')
    this.date = date || getDate(new Date())
  }
}
</script>

<style>
input#date-picker {
  max-width: 82px;
}
</style>
