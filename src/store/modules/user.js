import { getUser } from '@/api/reddit'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUserProp: (state) => (prop) => {
      return state.user[prop]
    }
  },
  actions: {
    async fetchUser(context) {
      const user = await getUser();
      if (user.data) {
        context.commit('setUser', user.data)
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  }
}