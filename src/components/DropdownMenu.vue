<template>
  <div class="dropdown-menu-container" v-click-outside="closeMenu" >
    <button class="dropdown-menu-btn" @click.stop="toggleMenu">SORT <i class="fas fa-sort-down"></i></button>
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
    },
    toggleMenu() {
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
  width: 80px;
  height: 35px;
}
.dropdown-menu-btn {
  box-shadow: none;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.dropdown-menu-btn:focus {
  outline: none;
}
.dropdown-items {
  position: absolute;
  bottom: -200%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid grey;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.dropdown-item {
  cursor: pointer;
  background: white;
  width: 100%;
  text-align: left;
}
.dropdown-item:hover {
  color: white;
  background: hotpink;
}
.dropdown-item:not(:last-child) {
  border-bottom: 1px solid hotpink;
}
.fa-sort-down {
  position: relative;
  top: -2px;
}
</style>