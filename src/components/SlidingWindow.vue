<template>
  <div class="sliding-window" :class="{ active: isActive }">
    <button @click="close">Close</button>
    <div v-for="post in getSavedPosts()" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({
      activeSubreddit: state => state.user.activeSubreddit
    }),
    ...mapGetters({
      getSubredditSavedPosts: "user/getSubredditSavedPosts"
    }),
    isActive() {
      return this.activeSubreddit;
    }
  },
  methods: {
    ...mapActions({
      deselectSubreddit: "user/deselectSubreddit"
    }),
    close() {
      this.deselectSubreddit();
    },
    getSavedPosts() {
      if (!this.activeSubreddit) {
        return [];
      }
      const posts = this.getSubredditSavedPosts(this.activeSubreddit.display_name);
      return posts;
    }
  }
};
</script>

<style scoped>
.sliding-window {
  background-color: white;
  border-radius: 16px;
  width: 450px;
  height: 100%;
  padding: 15px;
  position: fixed;
  top: 0;
  right: 0;
  border: 1px solid hotpink;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
}
.sliding-window.active {
  transform: translateX(0%);
}
</style>
