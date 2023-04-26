/*
 * @Author: LuanZeHui
 * @Date: 2022-05-05 15:11:02
 * @LastEditors: LuanZeHui
 * @LastEditTime: 2022-05-05 15:11:31
 * @Description: file content
 */
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: "/",
      component: () => import("../pages/clock/clock.vue")
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
