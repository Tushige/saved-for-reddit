import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/views/SignIn";
import TheDashboard from "@/views/TheDashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Signin",
    component: SignIn
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: TheDashboard
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
