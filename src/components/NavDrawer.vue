<template lang="pug">
v-navigation-drawer(
  app
  dark
  fixed
  v-model="drawer"
)
  v-list
    v-list-tile(@click.native="gotoHome")
      v-list-tile-action
        v-icon home
      v-list-tile-content
        v-list-tile-title Home
    v-list-tile(@click.native="toggleFullscreen")
      v-list-tile-action
        v-icon fullscreen
      v-list-tile-content
        v-list-tile-title Fullscreen
    v-list-tile(@click.native="reset")
      v-list-tile-action
        v-icon clear_all
      v-list-tile-content
        v-list-tile-title Reset
</template>

<script>
import {toggleFullscreen} from '@/utils'

export default {
  name: 'NavDrawer',
  data: () => ({
    drawer: null
  }),
  methods: {
    toggleFullscreen () {
      toggleFullscreen()
      this.drawer = false
    },
    gotoHome () {
      this.$router.push('/')
      this.drawer = false
    },
    reset () {
      localStorage.clear()
      this.drawer = false
      this.$emit('toast', 'Reset done')
    }
  }
}
</script>
