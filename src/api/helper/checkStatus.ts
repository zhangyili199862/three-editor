import { ElMessage } from "element-plus";

export const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      ElMessage.error("请求失败！请您稍后重试");
      break;
    // case 401:
    //   //无token
    //   break;
    // case 403:
    //   //无权限
    //   break;
    case 404:
      ElMessage.error("您访问的资源不存在");
      break;
    // case 405:
    //   //请求方式错误
    //   break;
    // case 408:
    //   //请求超时
    //   break;
    case 500:
      ElMessage.error("服务器异常");
      break;
    case 502:
      ElMessage.error("网关错误");
      break;
    case 503:
      ElMessage.error("服务不可用");
      break;
    case 504:
      ElMessage.error("网关超时");
      break;
    default:
      ElMessage.error("请求失败");
  }
};
