<template>
  <div class="sliding-window" :class="{ active: isActive }">
    <button @click="close">Close</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      activeSubreddit: state => state.user.activeSubreddit
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
