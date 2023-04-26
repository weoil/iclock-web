/*
 * @Author: LuanZeHui
 * @Date: 2022-05-05 18:10:13
 * @LastEditors: LuanZeHui
 * @LastEditTime: 2022-05-05 18:18:12
 * @Description: file content
 */
import { useAxios } from "@/hooks/useAxios";

const { request } = useAxios();

export const sayHello = async () => {
  return request({
    url: "/hello"
  });
};
