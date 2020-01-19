<template>
  <div>
    <div class="subreddit-list">
      <h3>
        Subreddits <span class="subreddits_count">{{ subreddits.length }}</span>
      </h3>
      <div class="subreddit-items">
        <SubredditListItem
          v-for="subreddit in subreddits"
          :key="subreddit.id"
          :subreddit="subreddit"
          v-on:update="selectSubreddit(subreddit)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SubredditListItem from "./SubredditListItem";
export default {
  components: {
    SubredditListItem
  },
  computed: {
    ...mapState({
      subreddits: state => state.user.subreddits
    })
  },
  methods: {
    ...mapActions({
      setActiveSubreddit: "user/selectSubreddit"
    }),
    selectSubreddit(subreddit) {
      this.setActiveSubreddit(subreddit);
    }
  }
};
</script>

<style scoped>
.subreddit-list {
  max-width: 1150px;
  margin: 0 auto;
}
.subreddit-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
