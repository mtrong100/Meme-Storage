import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import CreatePost from "../pages/CreatePost.vue";
import EditPost from "../pages/EditPost.vue";
import ManagePosts from "../pages/ManagePosts.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/create", name: "CreatePost", component: CreatePost },
  { path: "/edit/:id", name: "EditPost", component: EditPost, props: true },
  { path: "/manage", name: "ManagePosts", component: ManagePosts },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
