<template lang="pug">
v-app#app
  nav-drawer(ref="navDrawer")
  v-toolbar(
   app
   color="primary"
   dark
   dense
   fixed
  )
    date-picker
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
import DatePicker from './DatePicker.vue'
import NavDrawer from '@/components/NavDrawer.vue'
import SnackBar from '@/components/SnackBar.vue'

export default {
  name: 'App',
  components: {
    DatePicker,
    NavDrawer,
    SnackBar
  },
  data: () => ({
    loading: false
  }),
  created () {
    this.$bus.$on('loading', loading => {
      this.loading = loading
    })
  },
  methods: {
    updateVideos () {
      this.$store.dispatch('updateVideos', { force: true })
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
