import Vue from 'vue'
import Vuex from 'vuex'

import { getDate } from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: null,
    toast: {
      message: null,
      show: false
    }
  },
  mutations: {
    setDate (state, date) {
      state.date = date
    },
    setDateToday (state) {
      state.date = getDate(new Date())
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

  }
})
