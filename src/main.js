import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3,
    secondary: colors.grey.lighten3,
    accent: colors.indigo.base
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
