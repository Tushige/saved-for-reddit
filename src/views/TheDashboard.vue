<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div class="dashboard" v-else>Hi, I'm dashboard</div>
  </div>
</template>
<script>
import { getRedditToken, generateRedditAccessToken } from "@/utils/reddit_helper";

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
    console.log(this.$route);
    let code = this.$route.query.code;
    localStorage.setItem("code", code);
    const hasToken = getRedditToken();
    console.log(`token: ${hasToken}`);
    if (!hasToken || hasToken === "undefined" || hasToken === "null") {
      console.log("generating token");
      generateRedditAccessToken()
        .then(() => (this.isLoading = false))
        .catch(function() {
          console.log(this);
        });
    }
  }
};
</script>
<style scoped></style>
