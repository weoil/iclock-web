import { useAxios } from "@/hooks/useAxios";

const { request } = useAxios();

// 获取心灵鸡汤的一句话
export const getChickenSoupForTheSoul = async () => {
  return request<{ hitokoto: string }>({
    url: "https://v1.hitokoto.cn"
  });
};
