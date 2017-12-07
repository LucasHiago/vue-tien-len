import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/main.vue';
import testPixi from '../components/testPixi.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/pixi',
      name: 'pixi',
      component: testPixi
    }
  ]
});
