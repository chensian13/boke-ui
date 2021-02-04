import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function initRouter () {
  return new Router({
    routes: [{
      name: '',
      path: '/',
      component: () => import('@/views/loginRegister/login')
    }, {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/loginRegister/login')
    }, {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/loginRegister/register')
    }, {
      name: 'Users',
      path: '/users',
      component: () => import('@/views/loginRegister/users')
    }, {
      name: 'ModPass',
      path: '/modPass',
      component: () => import('@/views/loginRegister/save/modPass.vue')
    }, {
      name: 'FindPass',
      path: '/findPass',
      component: () => import('@/views/loginRegister/save/findPass.vue')
    }, {
      name: 'EditInfo',
      path: '/editInfo',
      component: () => import('@/views/loginRegister/save/editInfo.vue')
    }, {
      name: 'SaveBoke',
      path: '/saveBoke',
      component: () => import('@/views/work/boke/saveBoke.vue')
    }, {
      name: 'BokeList',
      path: '/bokeList',
      component: () => import('@/views/work/boke/bokeList.vue')
    }]
  })
}

export default initRouter()