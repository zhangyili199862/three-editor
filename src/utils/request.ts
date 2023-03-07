import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { ElMessage } from "element-plus";
export const createAxiosByinterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    timeout: 60000,
    withCredentials: true,
    ...config,
  });

  /**
   * 添加请求拦截器
   */
  instance.interceptors.request.use(
    function (config: any) {
      //发送请求前
      return config;
    },
    function (error) {
      //请求错误时
      return Promise.reject(error);
    }
  );

  /**
   * 添加响应拦截器
   */
  instance.interceptors.response.use(
    function (response) {
      //对响应数据的操作
      const { code, data, message } = response.data;
      if (code === 200) {
        return data;
      } else if (code === 401) {
        //用户请求没有权限
      } else {
        ElMessage.error(message);
        return Promise.reject(response.data);
      }
    },
    function (error) {
      if (error.response) {
      }
      ElMessage.error(error?.response?.data?.message || "服务器异常");
      return Promise.reject(error);
    }
  );
  return instance;
};
