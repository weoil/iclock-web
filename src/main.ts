/*
 * @Author: LuanZeHui
 * @Date: 2022-05-05 14:48:16
 * @LastEditors: LuanZeHui
 * @LastEditTime: 2022-05-05 15:13:11
 * @Description: file content
 */
import "@/plugins/windi.css";
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";

const setupAll = async () => {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  app.mount("#app");
};

setupAll();
