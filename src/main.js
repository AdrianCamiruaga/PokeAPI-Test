import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Favoritos from './components/Favoritos'

Vue.use(VueRouter);

const router = new VueRouter(
  {
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', component: Home },
      { path: '/favoritos', component: Favoritos}
    ]
  }
);

new Vue({
  // el: '#app',    Ya no se usara, debido al metodo mounthed de abajo
  router,
  template: '<App/>',
  components: {App }
  //render: h => h(App)
}).$mount('#app')
