import { RouteRecordRaw } from "vue-router";
import { hadAuthMeta, hadAuthRoleMeta, noAuthMeta } from "./config";
import Caption from "/@/views/Layout/Caption.vue";
import Game from "../views/Layout/Game.vue";
export const EXCEPTION_COMPONENT = () => import("/@/page/Exception/404.vue");
// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: EXCEPTION_COMPONENT,
  meta: noAuthMeta
};

export const viewsRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/caption"
  },
  {
    path: "/caption",
    name: "启幕",
    redirect: "/caption/title",
    meta: noAuthMeta,
    component: Caption,
    children: [
      {
        path: "title",
        name: "标题",
        meta: noAuthMeta,
        component: () => import("/@/views/Caption/Title/index.vue")
      },
      {
        path: "login",
        name: "登录",
        meta: noAuthMeta,
        component: () => import("/@/views/Caption/Login/index.vue")
      }
    ]
  },
  {
    path: "/game",
    name: "游戏",
    redirect: "/game/main",
    meta: hadAuthMeta,
    component: Game,
    children: [
      {
        path: "main",
        name: "主界面",
        meta: hadAuthRoleMeta,
        component: () => import("/@/views/Game/Main/index.vue")
      },
      {
        path: "role",
        name: "角色",
        meta: hadAuthMeta,
        component: () => import("/@/views/Game/Role/index.vue")
      }
    ]
  },
  {
    path: "/edit",
    name: "编辑器",
    redirect: "/edit/map",
    meta: noAuthMeta,
    component: Game,
    children: [
      {
        path: "map",
        name: "地图",
        meta: noAuthMeta,
        component: () => import("/@/page/Edit/Map/index.vue")
      }
    ]
  }
];
