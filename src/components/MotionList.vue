<template lang="pug">
v-container(
  fluid
  grid-list-xs
)
  v-layout(
    row
    wrap
  )
    v-flex(
      v-for="video in videosDate"
      :key="`${date}/${video.time}`"
      xs4
      sm3
      md2
    )
      img(
        :src="`${motionPrefix}${date}/${video.time}.jpg`"
        :class="{[$style.imgSelected]: (dialog && video.time === time)}"
        width="100%"
        height="100%"
        @click.stop="showMotionDetail(video.time)"
      )
  nav-fab
  v-dialog(
    :content-class="$style.dialog"
    hide-overlay
    persistent
    :transition="false"
    :value="dialog"
  )
    v-btn(
      :class="$style.dialogClose"
      fab
      small
      color="primary"
      fixed
      right
      @click.native.stop="$router.replace({params: {time: null}})"
    )
      v-icon(small) close
    motion-live(
      v-if="live"
      :src="liveStream"
    )
    motion-detail(
      v-else
      :baseName="time ? `${motionPrefix}${date}/${time}` : ''"
      :spriteFrames="spriteFrames"
    )
</template>

<script>
import { mapGetters } from 'vuex'
import MotionDetail from './MotionDetail.vue'
import MotionLive from './MotionLive.vue'
import NavFab from './NavFab.vue'

export default {
  name: 'MotionList',
  components: {
    MotionDetail,
    MotionLive,
    NavFab
  },
  props: {
    liveStream: String,
    motionPrefix: {
      type: String,
      required: true
    },
    spriteFrames: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    time: null
  }),
  computed: {
    date: {
      get () {
        return this.$store.state.date
      },
      set (date) {
        this.$store.dispatch('updateVideos', { date })
      }
    },
    dialog () {
      return !!this.time
    },
    live () {
      return this.time === 'live'
    },
    ...mapGetters([
      'videosDate'
    ])
  },
  watch: {
    '$route' (route) {
      this.date = route.params.date
      this.time = route.params.time
    },
    date (date) {
      this.$router.replace({ params: { date } })
    }
  },
  created () {
    const date = this.$route.params.date
    if (date) {
      this.date = date
    } else {
      this.$store.dispatch('updateVideosToday')
    }
  },
  methods: {
    showMotionDetail (time) {
      if (this.time === time) {
        this.$router.replace({params: {time: null}})
      } else {
        this.$router.replace({params: {time}})
      }
    }
  }
}
</script>

<style module>
.dialog {
  transition-duration: 0s !important;
  position: fixed;
  top: 48px;
  margin: 0 !important;
}

.dialogClose {
  width: 32px !important;
  height: 32px !important;
  margin-right: -15px !important;
}

.imgSelected {
  outline: 2px dashed #EEEEEE;
  outline-offset: -2px;
}
</style>
