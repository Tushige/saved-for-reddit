<template>
  <div>
    <TheHeader/>
    <div class="dashboard">
      <div class="main-view" :class="{ 'shared-view': isSubredditSelected }">
        <div class="gutter"></div>
        <div class="main-content">
          <div class="main-content_header">
            <h1 class="title">Hi ThrowMeAway1999</h1>
            <p class="welcome-text">Tidying orders and relaxes the minds</p>
            <p></p>
            <SearchBar :input-handler="updateSubredditSearchTerm"/>
          </div>
          <SubredditList />
        </div>
      </div>
      <SlidingWindow :is-active="isSubredditSelected" v-on:closed="closeSlidingWindow" />
    </div>
  </div>
</template>
<script>
import TheHeader from "@/components/TheHeader";
import { getRedditToken, generateRedditAccessToken } from "@/api/reddit";
import { mapState, mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/SearchBar";
import SubredditList from "@/components/SubredditList";
import SlidingWindow from "@/components/SlidingWindow";
import debounce from "lodash.debounce";

export default {
  components: {
    SubredditList,
    SlidingWindow,
    SearchBar,
    TheHeader
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
    this.debounce = debounce;
  },
  methods: {
    signout() {
      this.$router.push("signout");
    },
    ...mapActions({
      fetchUser: "user/fetchUser",
      fetchSubreddits: "user/fetchSubreddits",
      fetchSavedPosts: "posts/fetchSavedPosts",
      deselectSubreddit: "user/deselectSubreddit",
      setSubredditSearchTerm: "user/setSubredditSearchTerm"
    }),
    fetchData() {
      Promise.all([this.fetchUser(), this.fetchSubreddits(), this.fetchSavedPosts()]).then(() => {
        this.isLoading = false;
      });
    },
    closeSlidingWindow() {
      this.deselectSubreddit();
    },
    updateSubredditSearchTerm: debounce(function(e) {
      const text = e.target.value;
      this.setSubredditSearchTerm(text);
    }, 300),
    close() {
      this.$emit("closed");
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

.main-content_header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 48px;
  margin-bottom: 0;
}
.welcome-text {
  margin-top: 0;
}
</style>
