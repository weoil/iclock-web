/*
 * @Author: LuanZeHui
 * @Date: 2022-05-05 14:48:16
 * @LastEditors: LuanZeHui
 * @LastEditTime: 2022-05-05 18:23:39
 * @Description: file content
 */
import { resolve } from "path";
import { loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import VueJsx from "@vitejs/plugin-vue-jsx";
import EslintPlugin from "vite-plugin-eslint";
import DefineOptions from "unplugin-vue-define-options/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { createStyleImportPlugin } from "vite-plugin-style-import";
// import { viteMockServe } from "vite-plugin-mock";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
const root = process.cwd();

function pathResolve(dir: string) {
  return resolve(root, ".", dir);
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = null;
  const isBuild = command === "build";
  if (!isBuild) {
    env = loadEnv(process.argv[3] === "--mode" ? process.argv[4] : process.argv[3], root);
  } else {
    env = loadEnv(mode, root);
  }
  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      VitePWA({
        manifest: {
          name: "翻页时钟",
          short_name: "翻钟"
        }
      }),
      Vue(),
      VueJsx(),
      WindiCSS(),
      createStyleImportPlugin({}),
      EslintPlugin({
        // cache: false,
        include: ["src/**/*.vue", "src/**/*.ts", "src/**/*.tsx"] // 检查的文件
      }),
      // viteMockServe({
      //   ignore: /^\_/,
      //   mockPath: "mock",
      //   logger: true,
      //   localEnabled: !isBuild,
      //   supportTs: true,
      //   prodEnabled: isBuild,
      //   injectCode: `
      //     import { setupProdMockServer } from '../mock/_createProductionServer'

      //     setupProdMockServer()
      //     `
      // }),
      DefineOptions(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            injectScript: `<script src="./inject.js"></script>`
          }
        }
      })
    ],

    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true,
          resources: "./src/styles/customer.less"
        }
      }
    },
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".less", ".css"],
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve("src")}/`
        }
      ]
    },
    build: {
      minify: "terser",
      outDir: env.VITE_OUT_DIR || "dist",
      sourcemap: env.VITE_SOURCEMAP === "true" ? "inline" : false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === "true",
          drop_console: env.VITE_DROP_CONSOLE === "true"
        }
      }
    },
    server: {
      cors: true,
      proxy: {
        // 选项写法
        "/api/": {
          target: "http://127.0.0.1:9090",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      },
      hmr: {
        overlay: false
      },
      host: "0.0.0.0"
    },
    optimizeDeps: {
      include: ["vue", "vue-router", "vue-types", "axios"]
    }
  };
};
