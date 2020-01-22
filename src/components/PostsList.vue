<template>
  <div class="posts-list">
    <PostsListItem v-for="post in savedPosts" :key="post.id" :post="post"></PostsListItem>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PostsListItem from "./PostsListItem";

export default {
  components: {
    PostsListItem
  },
  computed: {
    ...mapState({
      activeSubreddit: state => state.user.activeSubreddit
    }),
    ...mapGetters({
      getSubredditSavedPosts: "user/getSubredditSavedPosts"
    }),
    savedPosts() {
      return this.activeSubreddit ? this.getSubredditSavedPosts(this.activeSubreddit.display_name) : [];
    }
  }
};
</script>

<style scoped>
.posts-list {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
