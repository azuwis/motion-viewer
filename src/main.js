import Vue from 'vue'
import App from '@/components/App.vue'
import router from './router'
import './registerServiceWorker'

import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
