import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import axios from 'axios'
import { addDate, getDate } from './utils'

Vue.use(Vuex)

const motionViewerConfig = window.motionViewerConfig

async function getVideos (date) {
  const response = await axios.get(`${motionViewerConfig.motionPrefix}${date}/`)
  return response.data.filter(file => {
    return file.name.endsWith('.jpg') && !file.name.endsWith('-sprite.jpg')
  }).map(file => {
    const time = file.name.replace(/\.jpg$/, '')
    return { time }
  })
}

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [
        'date',
        'videos'
      ]
    })
  ],
  state: {
    date: getDate(new Date()),
    initialized: !motionViewerConfig.needInit,
    loading: false,
    toast: {
      message: null,
      show: false
    },
    videos: {}
  },
  getters: {
    videosDate (state) {
      return state.initialized ? state.videos[state.date] : null
    }
  },
  mutations: {
    initialized (state) {
      state.initialized = true
    },
    reset (state) {
      state.date = getDate(new Date())
      state.videos = {}
    },
    setDate (state, date) {
      state.date = date
    },
    setLoading (state, loading) {
      state.loading = loading
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
    async updateVideos ({ dispatch, commit, state }, { date, init, force }) {
      let shouldUpdate
      if (date === undefined) {
        date = state.date
        shouldUpdate = false
      } else {
        if (date === 'today') {
          date = getDate(new Date())
        } else if (Number.isInteger(date)) {
          date = addDate(state.date, date)
        }
        shouldUpdate = !state.videos[date]
        if (state.date !== date) commit('setDate', date)
      }
      if (shouldUpdate || force || (init && motionViewerConfig.needInit)) {
        commit('setLoading', true)
        try {
          commit('setVideos', { date, videos: await getVideos(date) })
          commit('initialized')
        } catch (error) {
          commit('toast', { message: `Error getting videos at ${date}` })
        }
        commit('setLoading', false)
      }
    }
  }
})
