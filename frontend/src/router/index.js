import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import CreateMessage from "../views/CreateMessage.vue";
import ViewMessage from "../views/ViewMessage.vue";
import { isLoggedIn, logoutUser } from '../services/auth'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      logoutUser();
      next('/login');   
    }
  
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/create",
    beforeEnter: (to, from, next) => {
      if(isLoggedIn()){
        next();
      }else{
        next('/login');
      }
    },
    name: "CreateMessage",
    component: CreateMessage
  },
  {
    path: "/view/:uuid",
    name: "ViewMessage",
    component: ViewMessage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
