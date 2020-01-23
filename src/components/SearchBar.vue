<template>
  <div class="search-bar">
    <i class="fas fa-search"></i>
    <input type="text" placeholder="search title" @input="inputHandler"/>
  </div>
</template>

<script>
export default {
  props: {
    inputHandler: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
.search-bar {
  text-align: left;
  position: relative;
}
.search-bar input {
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px 40px;
}
.search-bar input:focus {
  outline: none;
  border: 1px solid black;
}
.fa-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>