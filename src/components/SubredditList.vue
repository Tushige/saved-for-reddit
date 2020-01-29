<template>
  <div>
    <div class="subreddit-list" :class="{active: isSubredditSelected}" :style="subredditListStyle">
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
              :container-width="containerWidth"
            />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import SubredditListItem from "./SubredditListItem";
const _DEFAULT_WIDTH = 1000;
const _ACTIVE_WIDTH = 900;

export default {
  components: {
    SubredditListItem
  },
  props: {
    isSubredditSelected: {
      type: Boolean,
      required: true
    }
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
    },
    containerWidth() {
      return this.isSubredditSelected ? _ACTIVE_WIDTH : _DEFAULT_WIDTH;
    },
    subredditListStyle() {
      return {
        width: this.isSubredditSelected ? `780px` : `${_DEFAULT_WIDTH}px`
      };
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
  transition: opacity 0.3s ease-in;
}
.fade-enter {
  opacity: 0;
}
.subreddit-list {
  margin: 0 auto;
}
.subreddit-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
}
</style>
