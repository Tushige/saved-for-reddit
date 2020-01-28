import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/views/SignIn";
import TheDashboard from "@/views/TheDashboard";
import TheAnalytics from '@/views/TheAnalytics';
import store from '@/store/index'
import { clearRedditTokens } from '@/api/reddit'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter(to, from, next) {
      next({ name: 'signin' })
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
    beforeEnter(to, from, next) {
      if (store.state.auth.isAuthenticated) {
        next({ name: 'dashboard' })
      } else {
        next()
      }
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: TheDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/analytics",
    name: "analytics",
    component: TheAnalytics,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signout',
    name: 'signout',
    beforeEnter(to, from, next) {
      store.dispatch('auth/signOut')
        .then(() => {
          clearRedditTokens();
          next({ name: 'signin' })
        })
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

// auth guard
router.beforeEach((to, from, next) => {
  store.dispatch('auth/initAuthentication')
    .then((user) => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        if (user) {
          next()
        } else {
          next({ name: 'signin' })
        }
      } else {
        next()
      }
    })
})
export default router;
