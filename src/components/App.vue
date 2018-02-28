<template lang="pug">
v-app#app(@toast="$refs.snackBar.toast")
  nav-drawer(ref="navDrawer")
  v-toolbar(
   app
   color="primary"
   dark
   dense
   fixed
  )
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
        :loading="loading ? 'success' : false"
      )
      v-date-picker(no-title v-model="date")
    v-spacer
    v-btn.app-btn(
      :class="$style.iconButton"
      icon
      @click.native="updateVideos"
    )
      v-icon cloud_download
    v-btn.app-btn(
      :class="$style.iconButton"
      icon
      @click.stop="$refs.navDrawer.drawer = true"
    )
      v-icon more_vert
  v-content
    router-view
  snack-bar(ref="snackBar")
</template>

<script>
import NavDrawer from '@/components/NavDrawer.vue'
import SnackBar from '@/components/SnackBar.vue'
import {getDate} from '@/utils'

export default {
  name: 'App',
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
  created () {
    const date = localStorage.getItem('date')
    this.date = date || getDate(new Date())
    this.$bus.$on('loading', loading => {
      this.loading = loading
    })
  },
  methods: {
    gotoToday () {
      this.date = getDate(new Date())
    },
    updateVideos () {
      this.$bus.$emit('update-videos')
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
