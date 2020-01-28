<template>
  <div>
    <div class="subreddit-list">
      <h3>
        Subreddits: <span class="subreddits_count">{{ subreddits.length }}</span>
      </h3>
        <!-- <div v-show="isLoading">loading</div> -->
      <transition name="fade">
        <div class="subreddit-items">
            <SubredditListItem
              v-for="(subreddit, idx) in subreddits"
              :key="subreddit.id"
              :subreddit="subreddit"
              v-on:update="selectSubreddit(subreddit)"
              :idx="idx"
              v-on:onImageLoad="onImageLoad"
              :isLoading="isLoading"
            />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import SubredditListItem from "./SubredditListItem";
export default {
  components: {
    SubredditListItem
  },
  data() {
    return {
      numImagesLoaded: 0 // when value === number of list items, the list is shown
    };
  },
  computed: {
    ...mapGetters({
      subreddits: "user/getSubreddits"
    }),
    isLoading() {
      return this.numImagesLoaded < this.subreddits.length;
    }
  },
  methods: {
    ...mapActions({
      setActiveSubreddit: "user/selectSubreddit"
    }),
    selectSubreddit(subreddit) {
      this.setActiveSubreddit(subreddit);
    },
    onImageLoad() {
      this.numImagesLoaded += 1;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter {
  opacity: 0;
}
.subreddit-list {
  max-width: 1000px;
  margin: 0 auto;
}
.subreddit-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
