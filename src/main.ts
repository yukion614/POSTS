import { ref, createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import Posts from "./components/Posts.vue";
import Post from "./components/PostPage.vue";
import Home from "./components/Home.vue";
import Event from "./components/Event.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
  faTrash,
  faSortDown,
  faGlobe,
  faCirclePlay,
  faTv
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PostPage from "./components/PostPage.vue";
import Login from "./components/Login.vue"
import { createPinia } from "pinia";
import Registration from "./components/Registration.vue";
import Profile from "./components/Profile.vue"
import Avatar from "./components/Avatar.vue";
import CreatePost from "./components/CreatePost.vue";
import RevisePost from "./components/RevisePost.vue";
import News from "./components/News.vue";
import {i18n} from "./plugins/i18n.ts"
import Ranking from "./components/Ranking.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/event", name: "event", component: Event },
    { path: "/posts", name: "posts", component: Posts },
    { path: "/post/:id", name: "post", component: PostPage },
    { path: "/login", name: "login", component: Login },
    { path: "/registration", name: "registration", component: Registration },
    { path: "/profile" , name: 'profile' , component: Profile},
    { path: "/editavatar" , name: 'editavatar', component: Avatar},
    { path: "/create_post" , name: 'create_post' ,component: CreatePost  },
    { path: "/revise_post" , name: 'revise_post' ,component:RevisePost},
    { path: "/news" , name:'news',component: News},
    { path: "/ranking" , name:'ranking',component: Ranking}
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
});



library.add(faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight,faTrash,faSortDown,faGlobe,faCirclePlay,faTv);
createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount("#app");
