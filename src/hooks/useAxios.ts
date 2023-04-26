/*
 * @Author: LuanZeHui
 * @Date: 2022-05-05 16:34:58
 * @LastEditors: LuanZeHui
 * @LastEditTime: 2022-05-05 18:19:14
 * @Description: file content
 */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from "axios";
import { config } from "@/config/axios/config";
const { result_code, base_url, default_headers } = config;
import qs from "qs";

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH];
console.log(import.meta.env.VITE_API_BASEPATH);
// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
});
export const useAxios = () => {
  const request = <T>(option: AxiosConfig): AxiosPromise<T> => {
    const { url, method, params, data, responseType, headers } = option;
    // tenantPromise.promise.then(()=>)
    return service({
      url: url,
      method,
      params,
      data,
      responseType: responseType,
      headers: {
        ...default_headers,
        ...headers
      }
    });
  };

  return {
    request
  };
};

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === "post" &&
      (config.headers as AxiosRequestHeaders)["Content-Type"] ===
        "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }

    // get参数编码
    if (config.method === "get" && config.params) {
      let url = config.url as string;
      url += "?";
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<Recordable>) => {
    if (response.data.code && response.data.msg) {
      if (response.data.code === result_code) {
        return response.data;
      } else {
        // ElMessage.error(response.data.message);
      }
    }
    return { data: response.data };
  },
  (error: AxiosError<any>) => {
    const msg = error.response?.data?.msg || error.message;
    // console.log("err", error.response?.data); // for debug
    // if (error.response?.data.code === 401) {
    //   useUserStore().onLogOut();
    // }
    // ElMessage.error(msg);
    return Promise.reject(error);
  }
);

export { service };
