import Vue from 'vue'
import Vuex from 'vuex'

import { getDate } from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: null
  },
  mutations: {
    setDate (state, date) {
      state.date = date
    },
    setDateToday (state) {
      state.date = getDate(new Date())
    }
  },
  actions: {

  }
})
