<template>
  <div class="posts-lists">
    <PostsListItem v-for="post in getSavedPosts()" :key="post.id" :post="post"></PostsListItem>
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
    })
  },
  methods: {
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

<style scoped></style>
