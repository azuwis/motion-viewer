import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import { getDate } from './utils'

Vue.use(Vuex)

const motionViewerConfig = window.motionViewerConfig || {
  liveStream: 'live/',
  motionPrefix: 'motion/',
  spriteFrames: 50
}

async function getVideos (date) {
  const response = await axios.get(`${motionViewerConfig.motionPrefix}${date}`)
  return response.data.filter(file => {
    return file.name.endsWith('.jpg') && !file.name.endsWith('-sprite.jpg')
  }).map(file => {
    const time = file.name.replace(/\.jpg$/, '')
    return { time }
  })
}

export default new Vuex.Store({
  state: {
    date: null,
    toast: {
      message: null,
      show: false
    },
    videos: {}
  },
  getters: {
    videosDate (state) {
      return state.videos[state.date]
    }
  },
  mutations: {
    setDate (state, date) {
      state.date = date
    },
    setVideos (state, { date, videos }) {
      Vue.set(state.videos, state.date, videos)
    },
    toast (state, { message, show }) {
      if (message !== undefined) {
        state.toast.message = message
        state.toast.show = true
      }
      if (show !== undefined) state.toast.show = show
    }
  },
  actions: {
    async updateVideos ({ dispatch, commit, state }, { date, force }) {
      if (date === undefined) {
        date = state.date
      } else if (state.date !== date) {
        commit('setDate', date)
      }
      if (!state.videos[date] || force) {
        commit('setVideos', { date, videos: await getVideos(date) })
      }
    },
    updateVideosToday ({ dispatch }) {
      const date = getDate(new Date())
      dispatch('updateVideos', { date })
    }
  }
})
