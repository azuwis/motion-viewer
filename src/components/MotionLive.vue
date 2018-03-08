<template lang="pug">
img(
  ref="img"
  crossorigin="anonymous"
  :src="url"
  width="100%"
  @click="toggle"
  )
</template>

<script>

export default {
  name: 'MotionLive',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      url: this.src,
      visible: true,
      play: true
    }
  },
  mounted () {
    document.addEventListener('visibilitychange', this.visibilityChanged)
  },
  beforeDestroy: function () {
    this.$refs.img.src = ''
    document.removeEventListener('visibilitychange', this.visibilityChanged)
  },
  methods: {
    visibilityChanged: function () {
      if (document.hidden) {
        this.pause()
      } else if (this.visible) {
        this.resume()
      }
    },
    toggle: function () {
      if (this.play) {
        this.pause()
      } else {
        this.resume()
      }
    },
    pause: function () {
      if (!this.play) return
      const img = this.$refs.img
      const canvas = document.createElement('canvas')
      let width = img.naturalWidth
      let height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (width) {
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
      } else {
        width = 640
        height = 480
        canvas.width = width
        canvas.height = height
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)
      }
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.moveTo(width / 2 - 40, height / 2 - 50)
      ctx.lineTo(width / 2 - 40, height / 2 + 50)
      ctx.lineTo(width / 2 + 40, height / 2)
      ctx.fill()
      this.url = canvas.toDataURL('image/png')
      this.play = false
    },
    resume: function () {
      if (this.play) return
      const img = this.$refs.img
      const canvas = document.createElement('canvas')
      let width = img.naturalWidth
      let height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0)
      ctx.fillStyle = '#555'
      ctx.beginPath()
      ctx.moveTo(width / 2 - 30, height / 2 - 30)
      ctx.lineTo(width / 2 - 30, height / 2 + 30)
      ctx.lineTo(width / 2 + 20, height / 2)
      ctx.fill()
      this.url = canvas.toDataURL('image/png')
      setTimeout(() => {
        this.url = this.src
      }, 0)
      this.play = true
    }
  }
}
</script>
