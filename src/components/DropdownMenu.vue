<template>
  <div class="dropdown-menu-container">
    <button class="dropdown-menu-btn" @click="toggleMenu">SORT</button>
    <div class="dropdown-items" v-show="isOpen">
      <div class="dropdown-item" @click="setSortParam('date')">date</div>
      <div class="dropdown-item" @click="setSortParam('top')">top</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      sortParam: ""
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    setSortParam(param) {
      this.sortParam = param;
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
  bottom: -205%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid hotpink;
}
.dropdown-item:hover {
  color: white;
  background: hotpink;
}
.dropdown-item:not(:last-child) {
  border-bottom: 1px solid hotpink;
}
.dropdown-item {
  cursor: pointer;
}
</style>