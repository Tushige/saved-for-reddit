<template>
<div class="subredditlistitemcontainer">
  <transition name="fade">
    <div v-show="isLoading" class="skeleton-loader subreddit-item">
      <div class="line-dash"></div>
    </div>
  </transition>
  <transition name="fade">
    <div v-show="!isLoading" class="subreddit-item" :class="{ active: isActive }" @click="clickHandler">
      <img class="background" v-bind:src="imageUrl" ref="img"/>
      <div class="subreddit-item__title">{{ subreddit.display_name }}</div>
    </div>
  </transition>
</div>
</template>

<script>
import { mapState } from "vuex";
import anime from "animejs";

export default {
  props: {
    subreddit: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      imageUrl: `https://source.unsplash.com/random/150x150?sig=${this.idx})`,
      white_line_pos: 0
    };
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
      this.$emit("update");
    },
    skeletonLoader() {
      anime({
        targets: ".line-dash",
        left: 400,
        duration: 1500,
        loop: true,
        easing: "cubicBezier(.5, .05, .1, .3)"
      });
    }
  },
  mounted() {
    this.$refs.img.onload = () => {
      this.$emit("onImageLoad");
    };
    this.skeletonLoader();
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

.skeleton-loader {
  background-color: rgb(223, 223, 223);
}
.line-dash {
  position: relative;
  left: -150%;
  background: white;
  height: 150%;
  width: 15px;
  filter: blur(25px) brightness(1);
  transform: rotate(23deg);
}
/*load styles*/
.fade-enter,
.fade-leave {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
</style>
