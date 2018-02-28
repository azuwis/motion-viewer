<template lang="pug">
v-container(fluid grid-list-xs)
  v-layout(row wrap)
    v-flex(
      xs4 sm3 md2
      v-for="video in videos[date]"
      :key="`${date}/${video.time}`"
    )
      img(
        :src="`${motionPrefix}${date}/${video.time}.jpg`"
        :class="{[$style.imgSelected]: (dialog && video.time === selected)}"
        width="100%" height="100%"
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
      fixed right
      @click.native.stop="dialog = false; selected = null"
    )
      v-icon(small) close
    motion-detail(
      :baseName="selected ? `${motionPrefix}${date}/${selected}` : null"
      :spriteFrames="spriteFrames"
    )
</template>

<script>
import MotionDetail from '@/components/MotionDetail.vue'
import NavFab from '@/components/NavFab.vue'
import axios from 'axios'

export default {
  name: 'MotionList',
  components: {
    MotionDetail,
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
    dialog: false,
    date: null,
    selected: null,
    videos: {}
  }),
  watch: {
    '$route' (route) {
      this.date = route.params.date
      this.selected = null
      this.updateVideos(false)
    },
    videos: {
      handler (videos) {
        localStorage.setItem('videos', JSON.stringify(videos))
      },
      deep: true
    }
  },
  methods: {
    showMotionDetail (time) {
      if (this.dialog && this.selected === time) {
        this.selected = null
        this.dialog = false
      } else {
        this.selected = time
        this.dialog = true
      }
    },
    updateVideos (force = true) {
      if (!force && this.videos[this.date]) return
      this.$bus.$emit('loading', true)
      axios.get(`${this.motionPrefix}${this.date}/`).then(response => {
        this.$set(this.videos, this.date, response.data.filter(file => {
          return file.name.endsWith('.jpg') && !file.name.endsWith('-sprite.jpg')
        }).map(file => {
          const time = file.name.replace(/\.jpg$/, '')
          return {time}
        }))
      }).finally(() => {
        this.$bus.$emit('loading', false)
      })
    }
  },
  created () {
    const videosJson = localStorage.getItem('videos')
    if (videosJson) this.videos = JSON.parse(videosJson)
    this.date = this.$route.params.date
    this.updateVideos(true)
    this.$bus.$on('update-videos', this.updateVideos)
  }
}
</script>

<style module>
.dialog {
  transition-duration: 0s;
  position: fixed;
  top: 48px;
  margin: 0;
}

.dialogClose {
  width: 32px !important;
  height: 32px !important;
  margin-right: -15px;
}

.imgSelected {
  outline: 2px dashed #EEEEEE;
  outline-offset: -2px;
}
</style>
