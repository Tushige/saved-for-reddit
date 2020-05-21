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
      let posts = state.savedPosts;
      if (state.sortParam === "newest") {
        posts = state.savedPosts.sort(function(a, b) {
          return a.created >= b.created ? -1 : 1;
        });
      } else if (state.sortParam === "oldest") {
        posts = state.savedPosts.sort(function(a, b) {
          return a.created <= b.created ? -1 : 1;
        });
      } else if (state.sortParam === "top") {
        posts = state.savedPosts.sort(function(a, b) {
          return a.score >= b.score ? -1 : 1;
        });
      }
      if (state.searchTerm) {
        return posts.filter(
          post => post.subreddit === subreddit && post.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      return posts.filter(post => post.subreddit === subreddit);
    }
  },
  actions: {
    async fetchSavedPosts({ commit, rootState }) {
      let posts = await getSavedPosts(rootState.user.user.name);
      if (posts) {
        posts = posts.data.data.children.map(post => post.data);
        commit("setSavedPosts", posts);
      }
    },
    setSearchTerm({ commit }, searchTerm) {
      commit("setSearchTerm", searchTerm);
    },
    setSortParam({ commit }, sortParam) {
      commit("setSortParam", sortParam);
    }
  },
  mutations: {
    setSavedPosts(state, posts) {
      state.savedPosts = posts;
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setSortParam(state, sortParam) {
      state.sortParam = sortParam;
    }
  }
};
