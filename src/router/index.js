import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Topic from "../views/Topic.vue";
import User from "../views/User.vue";
// import MoreTopics from "../views/MoreTopics.vue";
import MoreTopics1 from "../views/MoreTopics1.vue";
import Messages from "../views/Messages.vue";
import NotFound from "../views/NotFound.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/topic/:id",
    name: "Topic",
    component: Topic,
  },
  {
    path: "/User/:User_Id",
    name: "User",
    component: User,
  },
  // {
  //   path: "/User/:User_Id/topics",
  //   name: "MoreTopics",
  //   component: MoreTopics,
  // },
  {
    path: "/User/:User_Id/topics",
    name: "MoreTopics1",
    component: MoreTopics1,
  },
  {
    path: "/my/messages",
    name: "Messages",
    component: Messages,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
