<template lang="pug">
v-container(
  fluid
  grid-list-xs
)
  route-date
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
      @click.native.stop="closeDialog"
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
import { mapGetters, mapState } from 'vuex'
import MotionDetail from './MotionDetail.vue'
import MotionLive from './MotionLive.vue'
import NavFab from './NavFab.vue'
import RouteDate from './RouteDate.vue'

export default {
  name: 'MotionList',
  components: {
    MotionDetail,
    MotionLive,
    NavFab,
    RouteDate
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
    dialog () {
      return !!this.time
    },
    live () {
      return this.time === 'live'
    },
    ...mapState([
      'date'
    ]),
    ...mapGetters([
      'videosDate'
    ])
  },
  watch: {
    '$route' (route) {
      this.time = route.params.time
    }
  },
  created () {
    this.time = this.$route.params.time
  },
  methods: {
    closeDialog () {
      this.$router.replace({ params: { time: null } })
    },
    showMotionDetail (time) {
      if (this.time === time) {
        this.closeDialog()
      } else {
        this.$router.replace({ params: { time } })
      }
    }
  }
}
</script>

<style module>
:global(#app .dialog__content) {
  z-index: 5 !important;
}

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
