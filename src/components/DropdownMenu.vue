<template>
  <div class="dropdown-menu-container" v-click-outside="closeMenu" >
    <button class="dropdown-menu-btn" @click.stop="toggleMenu">SORT</button>
    <div class="dropdown-items" v-show="isOpen">
      <div class="dropdown-item" @click="sortByParam('oldest')">oldest first</div>
      <div class="dropdown-item" @click="sortByParam('newest')">newest first</div>
      <div class="dropdown-item" @click="sortByParam('top')">top</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import clickOutside from "@/directives/click-outside";

export default {
  data() {
    return {
      isOpen: false
    };
  },
  directives: {
    clickOutside
  },
  methods: {
    ...mapActions({
      setSortParam: "posts/setSortParam"
    }),
    closeMenu() {
      this.isOpen = false;
      console.log("closing menu");
    },
    toggleMenu() {
      console.log("toggling meny");
      this.isOpen = !this.isOpen;
    },
    sortByParam(param) {
      this.setSortParam(param);
      this.toggleMenu();
    }
  }
};
</script>

<style scoped>
.dropdown-menu-container {
  position: relative;
  z-index: 100;
}
.dropdown-menu-btn {
  box-shadow: none;
  border: 1px solid hotpink;
  padding: 5px 10px;
  cursor: pointer;
}
.dropdown-menu-btn:focus {
  outline: none;
}
.dropdown-items {
  position: absolute;
  bottom: -200%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid hotpink;
}
.dropdown-item {
  cursor: pointer;
  background: white;
}
.dropdown-item:hover {
  color: white;
  background: hotpink;
}
.dropdown-item:not(:last-child) {
  border-bottom: 1px solid hotpink;
}
</style>