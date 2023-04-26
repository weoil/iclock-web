/*
 * @Author: LuanZeHui
 * @Date: 2022-05-05 18:11:18
 * @LastEditors: LuanZeHui
 * @LastEditTime: 2022-05-05 18:24:45
 * @Description: file content
 */
import { MockMethod } from "vite-plugin-mock";

const list: MockMethod[] = [
  {
    url: "/api/hello",
    method: "get",
    response: () => {
      return {
        text: "hello"
      };
    }
  }
];

export default list;
