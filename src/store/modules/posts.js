import { getUser, getSubreddits, getSavedPosts } from "@/api/reddit";

export default {
  namespaced: true,
  state: {
    savedPosts: null,
    searchTerm: null,
    sortParam: null
  },
  getters: {
    getSubredditSavedPosts: state => subreddit => {
      if (!state.searchTerm)
        return state.savedPosts.filter(post => post.subreddit === subreddit);
      return state.savedPosts.filter(post => post.subreddit === subreddit && post.title.includes(state.searchTerm))
    }
  },
  actions: {
    async fetchSavedPosts({ commit }) {
      let posts = await getSavedPosts();
      if (posts) {
        posts = posts.data.data.children.map(post => post.data);
        commit("setSavedPosts", posts);
      }
    },
    setSearchTerm({ commit }, searchTerm) {
      commit('setSearchTerm', searchTerm);
    },
    setSortParam({ commit }, sortParam) {
      commit('setSortParam', sortParam);
    }
  },
  mutations: {
    setSavedPosts(state, posts) {
      state.savedPosts = posts;
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    setSortParam(state, sortParam) {
      state.sortParam = sortParam
    }
  }
};
