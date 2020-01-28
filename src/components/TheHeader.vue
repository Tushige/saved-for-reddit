<template>
  <header class="header">
    <nav class="header-nav">
      <img src="@/assets/placeholder_logo.png" @click="$router.go('home')" class="logo nav-item">
      <router-link class="nav-item nav-btn" :to="{name: 'signout'}"><i class="icon fas fa-sign-out-alt"></i></router-link>
      <router-link class="nav-item nav-btn" :to="{name: 'analytics'}"><i class="icon fas fa-chart-pie"></i></router-link>
    </nav>
  </header>
</template>
<script>
export default {};
</script>

<style scoped>
.header {
  height: 100vh;
  width: 100px;
  position: fixed;
  box-shadow: 0px 0px 5px -1px rgb(216, 216, 216);
  background-color: white;
  position: fixed;
}
.header-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav-btn {
  background-color: white;
  outline: none;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.nav-btn:hover {
  border-right: 2px solid rgb(255, 132, 0);
  border-right: 2px solid steelblue;
}
.icon {
  /* color: rgb(255, 132, 0); */
  color: steelblue;
  font-size: 32px;
}
.logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.nav-item {
  margin-bottom: 25px;
  cursor: pointer;
}
</style>