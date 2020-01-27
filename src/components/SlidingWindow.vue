<template>
  <div class="sliding-window" :class="{ active: isActive }">
    <button @click="close" class="close-btn"><i class="fas fa-times"></i></button>
    <div class="options-container">
      <SearchBar :input-handler="updateSearchTerm"/>
      <DropdownMenu/>
    </div><PostsList/></div>
</template>

<script>
import anime from "animejs";
import PostsList from "./PostsList";
import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";
import { mapActions } from "vuex";
import debounce from "lodash.debounce";
export default {
  components: {
    PostsList,
    SearchBar,
    DropdownMenu
  },
  props: {
    isActive: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    isActive: function() {
      if (this.isActive) {
        anime({
          targets: ".sliding-window",
          translateX: -450,
          easing: "spring(1, 80, 40, 0)"
        });
        anime({
          targets: ".close-btn",
          left: "-60%",
          easing: "spring(1, 80, 40, 0)"
        });
      } else {
        anime({
          targets: ".sliding-window",
          translateX: 450,
          easing: "spring(1, 80, 40, 0)"
        });
      }
    }
  },
  methods: {
    ...mapActions({
      setSearchTerm: "posts/setSearchTerm"
    }),
    updateSearchTerm: debounce(function(e) {
      const text = e.target.value;
      this.setSearchTerm(text);
    }, 300),
    close() {
      this.$emit("closed");
    }
  },
  created() {
    this.debounce = debounce;
  }
};
</script>

<style scoped>
.sliding-window {
  background-color: white;
  border-radius: 16px;
  box-sizing: border-box;
  width: 450px;
  height: 100%;
  padding: 15px;
  position: fixed;
  top: 0;
  right: -450px;
  box-shadow: 0px 0px 4px -1px grey;
  padding: 15px;
}
.close-btn {
  border: 0;
  font-size: 32px;
  position: relative;
  left: -50%;
  top: -10px;
  cursor: pointer;
}
.close-btn:hover {
  color: crimson;
  transition: color 0.3s ease;
}
.options-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
