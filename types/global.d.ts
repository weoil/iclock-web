type RequestHeaders = {
  [x: string]: string | number | boolean;
};
declare interface Fn<T = any> {
  (...arg: T[]): T;
}

declare type Nullable<T> = T | null;

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>;

declare type AxiosMethod = "get" | "post" | "delete" | "put";

declare type AxiosResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

declare type AxiosConfig<T = Recordable, K = Recordable> = {
  params?: T;
  data?: K;
  url?: string;
  method?: AxiosMethod;
  headers?: RequestHeaders;
  responseType?: AxiosResponseType;
};
