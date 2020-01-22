<template>
  <div class="search-bar">
    <input class="fas fa-search" type="text" placeholder="search title" @input="updateSearchTerm"/>
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
}
.search-bar input {
  border: 1px solid hotpink;
  border-radius: 10px;
  padding: 5px 15px;
}
.search-bar input:focus {
  outline: none;
}
</style>