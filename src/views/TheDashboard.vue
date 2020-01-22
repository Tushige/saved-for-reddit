<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div class="dashboard" v-else>
      <div class="main-view" :class="{ 'shared-view': isSubredditSelected }">
        <button @click="signout">Sign out</button>
        <div class="gutter"></div>
        <div class="main-content">
          <div class="main-content_header">
            <h1>Hi {{ username }}</h1>
            <p class="welcome-text">Tidying orders and relaxes the minds</p>
            <p></p>
            <div class="search-box">Insert search box here</div>
          </div>
          <SubredditList />
        </div>
      </div>
      <SlidingWindow :is-active="isSubredditSelected" v-on:closed="closeSlidingWindow" />
    </div>
  </div>
</template>
<script>
import { getRedditToken, generateRedditAccessToken } from "@/api/reddit";
import { mapState, mapActions, mapGetters } from "vuex";
import SubredditList from "@/components/SubredditList";
import SlidingWindow from "@/components/SlidingWindow";

export default {
  components: {
    SubredditList,
    SlidingWindow
  },
  data() {
    return {
      isLoading: true
    };
  },
  props: {
    query: {
      type: Object
    }
  },
  created() {
    let code = this.$route.query.code;
    localStorage.setItem("code", code);
    const hasToken = getRedditToken();
    if (!hasToken || hasToken === "undefined" || hasToken === "null") {
      generateRedditAccessToken()
        .then(() => {
          this.fetchData();
        })
        .catch(function() {
          console.error("failed to generate reddit access token");
        });
    } else {
      this.fetchData();
    }
  },
  methods: {
    signout() {
      this.$router.push("signout");
    },
    ...mapActions({
      fetchUser: "user/fetchUser",
      fetchSubreddits: "user/fetchSubreddits",
      fetchSavedPosts: "posts/fetchSavedPosts",
      deselectSubreddit: "user/deselectSubreddit"
    }),
    fetchData() {
      Promise.all([this.fetchUser(), this.fetchSubreddits(), this.fetchSavedPosts()]).then(() => {
        this.isLoading = false;
      });
    },
    closeSlidingWindow() {
      this.deselectSubreddit();
    }
  },
  computed: {
    ...mapState({
      activeSubreddit: state => state.user.activeSubreddit
    }),
    ...mapGetters({
      getUserProp: "user/getUserProp"
    }),
    username: function() {
      return this.getUserProp("name");
    },
    isSubredditSelected() {
      return this.activeSubreddit ? true : false;
    }
  }
};
</script>
<style scoped>
.dashboard {
  display: flex;
}
.main-view {
  flex-basis: 100%;
  transition: flex-basis 0.3s ease-out;
}
.main-view.shared-view {
  flex-basis: 70%;
}
</style>
