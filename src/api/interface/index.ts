/**
 * 请求响应参数 不包含data
 */
export interface Result {
  code: string;
  msg: string;
}
/**
 * 请求响应参数
 */
export interface ResultData<T = any> extends Result {
  data: T;
}
/**
 * 分页响应参数
 */
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}
/**
 * 分页请求参数
 */
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

export namespace Device {
  export interface ReqDeviceParams extends ReqPage {
    deviceName?: string;
  }
  export interface ResDeviceList {
    id: string;
    deviceName: string;
    [key: string]: any;
  }
}
