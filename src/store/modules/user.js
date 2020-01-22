import { getUser, getSubreddits, getSavedPosts } from "@/api/reddit";

export default {
  namespaced: true,
  state: {
    user: null,
    subreddits: null,
    activeSubreddit: null,
    savedPosts: null,
    searchTerm: null
  },
  getters: {
    getUserProp: state => prop => {
      return state.user[prop];
    },
    getSubredditSavedPosts: state => subreddit => {
      if (!state.searchTerm)
        return state.savedPosts.filter(post => post.subreddit === subreddit);
      return state.savedPosts.filter(post => post.subreddit === subreddit && post.title.includes(state.searchTerm))
    }
  },
  actions: {
    async fetchUser(context) {
      const user = await getUser();
      if (user.data) {
        context.commit("setUser", user.data);
      }
    },
    async fetchSubreddits(context) {
      let subreddits = await getSubreddits();
      if (subreddits.data) {
        subreddits = subreddits.data.data.children.map(subreddit => subreddit.data);
        context.commit("setSubreddits", subreddits);
      }
    },
    async fetchSavedPosts({ commit }) {
      let posts = await getSavedPosts();
      if (posts) {
        posts = posts.data.data.children.map(post => post.data);
        commit("setSavedPosts", posts);
      }
    },
    selectSubreddit({ commit }, subreddit) {
      commit("setActiveSubreddit", subreddit);
    },
    deselectSubreddit({ commit }) {
      commit("setActiveSubreddit", null);
    },
    setSearchTerm({ commit }, searchTerm) {
      commit('setSearchTerm', searchTerm);
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSubreddits(state, subreddits) {
      state.subreddits = subreddits;
    },
    setActiveSubreddit(state, subreddit) {
      state.activeSubreddit = subreddit;
    },
    setSavedPosts(state, posts) {
      state.savedPosts = posts;
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    }
  }
};
