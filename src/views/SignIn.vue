<template>
  <div class="signin-page">
    <div class="banner">
      <img src="@/assets/banner_image_2.png" alt="banner image showing reddit logos"/>
    </div>
    <div class="form-container">
      <h1 class="title">SIGN IN</h1>
      <p class="welcome-text">Welcome back! Please sign in</p>
      <form id="signup-form" @submit.prevent="signin">
        <div class="form-group">
          <label
            for="email"
            id="email_label"
            class="form-label"
            :class="{active: isEmailActive}">Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            class="form-input"
            v-model="form.email"
            @focus="isEmailActive = true"
            @blur="isEmailActive = !!form.email"/>
        </div>
        <div class="form-group">
          <label 
          for="password"
          id="password_label"
          class="form-label"
          :class="{active: isPasswordActive}">Password
          </label>

          <input
          type="password"
          id="password"
          name="password"
          class="form-input"
          v-model="form.password"
          @focus="isPasswordActive = true"
          @blur="isPasswordActive = !!form.password"/>
        </div>

        <input type="submit" class="submit-btn" value="SIGN IN"/>
        <p v-if="authError" class="error">
          email or password is incorrect. Please try again!
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { REDDIT_CLIENT_ID, REDDIT_REDIRECT_URI, REDDIT_SCOPES } from "@/utils/consts";
import { mapActions } from "vuex";
import bannerImage from "@/assets/banner_image.jpg";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      isEmailActive: false,
      isPasswordActive: false,
      authError: false
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      signinWithEmailAndPassword: "auth/signinWithEmailAndPassword"
    }),
    signin() {
      this.signinWithEmailAndPassword({ email: this.form.email, password: this.form.password })
        .then(() => {
          const response_type = "code";
          const state = "123reddit";
          const duration = "temporary";
          const scope = REDDIT_SCOPES;
          window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=${response_type}&state=${state}&redirect_uri=${REDDIT_REDIRECT_URI}&duration=${duration}&scope=${scope}`;
        })
        .catch(error => {
          console.error(error);
          this.authError = true;
        });
    }
  }
};
</script>

<style scoped>
.signin-page {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 100vh;
  grid-template-areas: "banner form";
  font-family: "Montserrat", sans-serif;
  background-color: white;
}
.banner {
  grid-area: banner;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.form-container {
  grid-area: form;
  align-self: center;
  justify-self: center;
}
.title {
  margin-bottom: 0;
  color: rgb(61, 61, 61);
}
.welcome-text {
  color: rgb(155, 155, 155);
  margin-top: 0;
  margin-bottom: 50px;
}
#signup-form {
  width: 670px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
.form-group {
  position: relative;
  margin-bottom: 30px;
}
.form-input {
  outline: none;
  border: 0;
  border-bottom: 2px solid rgb(169, 169, 169);
  width: 350px;
  height: 30px;
  transition: border 0.3s ease-out;
  padding-left: 5px;
}
.form-input:focus {
  border-bottom-color: rgb(255, 132, 0);
}
.form-label {
  transition: transform 0.3s ease-out;
  margin-bottom: 5px;
}
.form-label.active {
  transform: scale(0.7) translate(-10px, -20px);
}
#signup-form label {
  color: grey;
  position: absolute;
  bottom: 0;
  left: 5px;
}
.submit-btn {
  border: 2px solid rgb(255, 132, 0);
  outline: none;
  width: 150px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease-out;
  font-size: 16px;

  background-color: rgb(255, 132, 0);
  color: white;
}
.submit-btn:hover {
  transform: scale(1.1);
}
.error {
  color: red;
}
</style>
