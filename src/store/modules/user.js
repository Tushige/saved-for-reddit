import { getUser, getSubreddits, getSavedPosts } from "@/api/reddit";

export default {
  namespaced: true,
  state: {
    user: null,
    subreddits: null,
    activeSubreddit: null,
    subredditSearchTerm: null
  },
  getters: {
    getUserProp: state => prop => {
      return state.user[prop];
    },
    getSubreddits: state => {
      if (state.subredditSearchTerm) {
        return state.subreddits.filter(subreddit => subreddit.display_name.includes(state.subredditSearchTerm));
      }
      return state.subreddits;
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
    selectSubreddit({ commit }, subreddit) {
      commit("setActiveSubreddit", subreddit);
    },
    deselectSubreddit({ commit }) {
      commit("setActiveSubreddit", null);
    },
    setSubredditSearchTerm({ commit }, searchTerm) {
      commit("setSubredditSearchTerm", searchTerm)
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
    setSubredditSearchTerm(state, searchTerm) {
      state.subredditSearchTerm = searchTerm;
    }
  }
};
