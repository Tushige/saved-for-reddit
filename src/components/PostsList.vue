<template>
  <div class="posts-list-slider">
    <div v-show="savedPosts.length < 1" class="no-posts-message">
      you have no saved posts
    </div>
    <transition name="fade">
      <div v-show="!!savedPosts" class="posts-list">
        <PostsListItem v-for="post in savedPosts" :key="post.id" :post="post"></PostsListItem>
      </div>
    </transition>
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
      getSubredditSavedPosts: "posts/getSubredditSavedPosts"
    }),
    savedPosts() {
      return this.activeSubreddit ? this.getSubredditSavedPosts(this.activeSubreddit.display_name) : [];
    }
  }
};
</script>

<style scoped>
.posts-list-slider {
  height: 100%;
  overflow-y: scroll;
}
.posts-list {
  width: 100%;
  margin-top: 25px;
  padding-bottom: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.no-posts-message {
  color: grey;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/*load animations*/
.fade-enter,
.fade-leave {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
</style>
