import { ref, createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import Posts from "./components/Posts.vue";
import Post from "./components/PostPage.vue";
import Home from "./components/Home.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PostPage from "./components/PostPage.vue";
import Login from "./components/Login.vue"
import { createPinia } from "pinia";
import Registration from "./components/Registration.vue";
import Profile from "./components/Profile.vue"
import Avatar from "./components/Avatar.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/posts", name: "posts", component: Posts },
    { path: "/post/:id", name: "post", component: PostPage },
    { path: "/login", name: "login", component: Login },
    { path: "/registration", name: "registration", component: Registration },
    { path: "/profile" , name: 'profile' , component: Profile},
    { path: "/editavatar" , name: 'editavatar', component: Avatar}
   
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
});

library.add(faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight);
createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount("#app");
