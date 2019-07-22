import Vue from 'vue'
import App from './App.vue'
//store export default yaptığımız için süslü parantez içinde yazmadık
import store from "./store"
import {router} from "./router"

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
