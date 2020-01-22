<template>
  <div class="search-bar">
    <i class="fas fa-search"></i>
    <input type="text" placeholder="search title" @input="updateSearchTerm"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import debounce from "lodash.debounce";
export default {
  methods: {
    ...mapActions({
      setSearchTerm: "user/setSearchTerm"
    }),
    updateSearchTerm: debounce(function(e) {
      const text = e.target.value;
      this.setSearchTerm(text);
    }, 300)
  },
  created() {
    this.debounce = debounce;
  }
};
</script>

<style scoped>
.search-bar {
  text-align: left;
  margin-left: 15px;
  position: relative;
}
.search-bar input {
  border: 1px solid hotpink;
  border-radius: 10px;
  padding: 10px 40px;
}
.search-bar input:focus {
  outline: none;
}
.fa-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>