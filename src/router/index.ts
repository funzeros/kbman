import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

// 静态路由
import { PAGE_NOT_FOUND_ROUTE, viewsRouter } from "./constant";

const router = createRouter({
  history: createWebHistory(),
  routes: [...viewsRouter]
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
router.addRoute(PAGE_NOT_FOUND_ROUTE);

export { router };
