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
function drawOuterRetangle (ctx, color, width, height) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(width / 2 - 40, height / 2 - 50)
  ctx.lineTo(width / 2 - 40, height / 2 + 50)
  ctx.lineTo(width / 2 + 40, height / 2)
  ctx.fill()
}

function drawInnerRetangle (ctx, color, width, height) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(width / 2 - 30, height / 2 - 30)
  ctx.lineTo(width / 2 - 30, height / 2 + 30)
  ctx.lineTo(width / 2 + 20, height / 2)
  ctx.fill()
}

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
      // 640x480 balck image
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgAQMAAAAPH06nAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURQAAAKd6PdoAAAA9SURBVHja7cEBDQAAAMKg909tDjegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAODPAJfgAAFLzBtKAAAAAElFTkSuQmCC',
      play: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.url = this.src
    }, 0)
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
      } else {
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
      let canvasFallback = true
      if (width) {
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
        try {
          ctx.getImageData(0, 0, 1, 1)
          canvasFallback = false
        } catch (error) {
        }
      }
      if (canvasFallback) {
        width = 640
        height = 480
        canvas.width = width
        canvas.height = height
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)
      }
      drawOuterRetangle(ctx, 'white', width, height)
      drawInnerRetangle(ctx, '#555', width, height)
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
      drawOuterRetangle(ctx, 'white', width, height)
      try {
        this.url = canvas.toDataURL('image/png')
      } catch (error) {
      }
      setTimeout(() => {
        this.url = this.src
      }, 0)
      this.play = true
    }
  }
}
</script>
