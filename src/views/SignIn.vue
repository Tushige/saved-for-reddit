<template>
  <div class="signin">
    <h1>Sign in</h1>
    <form id="signup-form" @submit.prevent="signin">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email" />

      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password" />

      <input type="submit" />
    </form>
  </div>
</template>

<script>
import firebase from "@/utils/firebase";
import { REDDIT_CLIENT_ID, REDDIT_REDIRECT_URI, REDDIT_SCOPES } from "@/utils/consts";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions({
      signinWithEmailAndPassword: "auth/signinWithEmailAndPassword"
    }),
    signin() {
      this.signinWithEmailAndPassword({ email: this.email, password: this.password })
        .then(() => {
          const response_type = "code";
          const state = "123reddit";
          const duration = "temporary";
          const scope = REDDIT_SCOPES;
          window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=${response_type}&state=${state}&redirect_uri=${REDDIT_REDIRECT_URI}&duration=${duration}&scope=${scope}`;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped></style>
