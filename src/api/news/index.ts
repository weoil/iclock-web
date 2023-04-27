import { useAxios } from "@/hooks/useAxios";
import { WeiBoHotData } from "./news.types";

const { request } = useAxios();

// 获取新浪微博热搜
export const getWeiBoHots = async () => {
  return request<WeiBoHotData>({
    url: "/news/wb-hots"
  });
};
