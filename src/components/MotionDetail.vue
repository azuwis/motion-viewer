<template lang="pug">
div(v-if="baseName")
  img(
    v-show="false"
    :src="`${this.baseName}-sprite.jpg`"
  )
  video(
    v-if="video"
    :class="$style.video"
    width="100%"
    :poster="`${baseName}.jpg`"
    autoplay
    controls
    preload="none"
    @ended="reset"
  )
    source(
      :src="`${baseName}.mp4`"
      type="video/mp4"
    )
  img(
    v-else
    :src="src"
    :style="style"
    width="100%"
    @click="video = true"
    @mousemove="slide"
    @touchmove="slide"
  )
</template>

<script>
export default {
  name: 'MotionDetail',
  props: {
    baseName: {
      type: String,
      required: true
    },
    spriteFrames: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    preview: false,
    video: false,
    left: null,
    width: null,
    height: null,
    frame: 0
  }),
  computed: {
    src () {
      return !this.preview ? `${this.baseName}.jpg` : `${this.baseName}-sprite.jpg`
    },
    style () {
      return !this.preview ? null : {
        width: `${this.width}px`,
        height: `${this.height}px`,
        objectFit: 'cover',
        objectPosition: `-${this.frame * this.width}px`
      }
    }
  },
  watch: {
    baseName () {
      this.reset()
    }
  },
  mounted () {
    window.addEventListener('resize', this.resized)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resized)
  },
  methods: {
    slide (event) {
      if (!this.preview) {
        const rect = event.target.getBoundingClientRect()
        this.left = rect.left
        this.width = rect.right - rect.left
        this.height = rect.bottom - rect.top
        this.preview = true
      }
      const clientX = event.touches ? event.touches[0].clientX : event.clientX
      let percent = (clientX - this.left) / this.width
      if (percent >= 0.99) percent = 0.99
      this.frame = Math.floor(percent * this.spriteFrames)
    },
    reset () {
      this.preview = false
      this.video = false
    },
    resized () {
      this.preview = false
    }
  }
}
</script>

<style module>
.video {
  background-color: black;
}
</style>
