import Vue from 'vue'
import Router from 'vue-router'
import MotionList from '@/components/MotionList.vue'

Vue.use(Router)

const motionViewerConfig = window.motionViewerConfig || {
  liveStream: 'live/',
  motionPrefix: 'motion/',
  spriteFrames: 50
}

export default new Router({
  routes: [
    {
      path: '/:date',
      name: 'date',
      component: MotionList,
      props: motionViewerConfig
    }
  ]
})
