import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
//https://materialdesignicons.com/cdn/2.0.46/
// import { mdiThemeLightDark } from '@mdi/js';

Vue.config.productionTip = false
Vue.use(Vuetify)

const vuetifyOptions: any = {
  breakpoint: {},
  icons: {
    iconfont: 'mdi',
  },
  lang: {},
  rtl: false,
  theme: {
    dark: false
  },
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetifyOptions),
  render: h => h(App)
}).$mount('#app')
