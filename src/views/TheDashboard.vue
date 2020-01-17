<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div class="dashboard" v-else>
      <div class="main-view">
        <button @click="signout">Sign out</button>
        <div class="gutter"></div>
        <div class="main-content">
          <h1> Hi {{username}}</h1>
          <p class="welcome-text">Tidying orders and relaxes the minds<p>
            <div class='search-box'>Insert search box here</div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { getRedditToken, generateRedditAccessToken } from "@/api/reddit";
import firebase from "@/utils/firebase";
import { mapActions, mapGetters } from "vuex";

export default {
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
      fetchSubreddits: "user/fetchSubreddits"
    }),
    fetchData() {
      Promise.all([this.fetchUser(), this.fetchSubreddits()]).then(() => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    ...mapGetters({
      getUserProp: "user/getUserProp"
    }),
    username: function() {
      return this.getUserProp("name");
    }
  }
};
</script>
<style scoped></style>
