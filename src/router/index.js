import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/index.vue";
import Login from "../pages/authen/login.vue";

const routes = [
  {
    path: "/",
    props: true,
    component: Index,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  const publicPages = ["/login", "/forgetpassword"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // keep current path
  localStorage.setItem("path", to.path);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
