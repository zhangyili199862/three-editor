import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { ResultData } from "./interface";
import { ResultEnum } from "@/enums/httpEnum";
import { GlobalStore } from "@/store";
import { ElMessage } from "element-plus";
import { checkStatus } from "./helper/checkStatus";
const config = {
  //默认请求地址
  baseURL: import.meta.env.VITE_API_URL as string,
  //超时时间
  timeout: ResultEnum.TIMEOUT as number,

  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig & any) => {
        const globalStore = GlobalStore();

        const token = globalStore.token;
        return {
          ...config,
          headers: { ...config.headers, "x-access-token": token },
        };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        //   const globalStore = GlobalStore();

        //全局错误拦截
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }

        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        if (error.message.indexOf("timeout") !== -1)
          ElMessage.error("请求超时!请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1)
          ElMessage.error("网络错误!请您稍后重试");
        if (response) checkStatus(response.status);
        return Promise.reject(error);
        // if(!window.navigator.onLine) router.replace("/500");
      }
    );
  }
  //常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
