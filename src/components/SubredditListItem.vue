<template>
  <div class="subreddit-item" :class="{ active: isActive }" @click="clickHandler">
    <div class="subreddit-item__title">{{ subreddit.display_name }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    subreddit: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      activeSubreddit: state => state.user.activeSubreddit
    }),
    isActive() {
      if (!this.activeSubreddit) {
        return false;
      }
      return this.activeSubreddit.id === this.subreddit.id;
    }
  },
  methods: {
    clickHandler() {
      console.log("[subredditListItem] clicked!");
      this.$emit("update");
    }
  }
};
</script>

<style scoped>
.subreddit-item {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid hotpink;
  margin: 10px;
  cursor: pointer;

  &.active {
    background: limegreen;
  }
}
.subreddit-item.active {
  border-color: limegreen;
}
</style>
