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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      // Cuộn lên đầu khi chuyển trang
      return { top: 0, behavior: "smooth" }; // hoặc bỏ 'behavior' nếu muốn cuộn ngay lập tức
    }
  },
});

export default router;
