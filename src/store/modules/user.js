import { getUser, getSubreddits } from '@/api/reddit'

export default {
  namespaced: true,
  state: {
    user: null,
    subreddits: null
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
    },
    async fetchSubreddits(context) {
      let subreddits = await getSubreddits();
      console.log(subreddits)
      if (subreddits.data) {
        subreddits = subreddits.data.data.children.map(subreddit => subreddit.data)
        context.commit('setSubreddits', subreddits)
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSubreddits(state, subreddits) {
      state.subreddits = subreddits
    }
  }
}