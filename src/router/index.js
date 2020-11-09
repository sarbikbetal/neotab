import Vue from 'vue'
import VueRouter from 'vue-router'
import NewTab from '../views/NewTab.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NewTab',
    component: NewTab,
  },
  {
    path: '/rtc',
    name: 'RTC',
    component: function() {
      return import('../views/RTCHome.vue')
    },
  },
  {
    path: '/rtc/join',
    name: 'Join room',
    beforeEnter: (to, from, next) => {
      let id = to.query.r
      if (id)
        fetch(`http://neotab.herokuapp.com/room?r=${id}`)
          .then(res => res.json())
          .then(data => {
            if (data.exists) next()
            else next({ path: '/404' })
          })
          .catch(err => {
            console.log(err)
            next({ path: '/rtc' })
          })
      else next('/rtc')
    },
    component: function() {
      return import('../views/RTCJoin.vue')
    },
  },
  // {
  //   path: '/join',
  //   name: 'Join',
  //   beforeEnter: (to, from, next) => {
  //     let id = to.query.r
  //     fetch(`https://zymo.herokuapp.com/room?r=${id}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.exists) {
  //           next()
  //         } else {
  //           next({
  //             path: '/404',
  //           })
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         next({
  //           path: '/',
  //         })
  //       })
  //   },
  //   component: function() {
  //     return import('../views/Join.vue')
  //   },
  // },
  {
    path: '*',
    name: 'Error',
    component: function() {
      return import('../views/Error.vue')
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
