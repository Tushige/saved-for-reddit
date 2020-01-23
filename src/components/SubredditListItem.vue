<template>
  <div class="subreddit-item" :class="{ active: isActive }" @click="clickHandler">
  <div class="background" :style="{backgroundImage: `url(https://source.unsplash.com/random/150x150?sig=${idx})`}">
  </div>
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
    },
    idx: {
      type: Number,
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
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #fff;
  margin: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.background {
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: brightness(0.6);
  transition: transform 0.3s ease-out;
  transform: scale(1.1);
}
.subreddit-item:hover .background {
  transform: scale(1);
}
.subreddit-item__title {
  transition: transform 0.3s ease-in;
  font-weight: bold;
  font-family: "Libre Franklin", sans-serif;
  font-size: 18px;
}
.subreddit-item:hover .subreddit-item__title {
  transform: scale(1.1);
}
.subreddit-item.active {
  border-color: limegreen;
}
</style>
