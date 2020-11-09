import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import './assets/tailwind.css'
import VueSnackbar from '@/plugins/vue-snack/vue-snack.min.js'
import '@/plugins/vue-snack/vue-snack.min.css'

Vue.config.productionTip = false

Vue.use(VueSnackbar, {
  position: 'top-right',
  time: 5000,
  methods: [
    { name: 'success', color: '#00ff8c' },
    { name: 'error', color: '#ff0051' },
  ],
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
