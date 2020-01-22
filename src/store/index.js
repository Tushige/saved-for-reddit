import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import posts from './modules/posts'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    auth,
    user,
    posts
  }
})

export default store