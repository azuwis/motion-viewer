import Vue from 'vue'
import Router from 'vue-router'
import MotionList from './components/MotionList.vue'
import MotionLive from './components/MotionLive.vue'

Vue.use(Router)

const motionViewerConfig = window.motionViewerConfig

export default new Router({
  routes: [
    {
      path: '/live',
      name: 'live',
      component: MotionLive,
      props: { src: motionViewerConfig.liveStream }
    },
    {
      path: '/:date?/:time?',
      name: 'date',
      component: MotionList,
      props: motionViewerConfig
    }
  ]
})
