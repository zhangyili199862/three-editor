import http from "@/api";
import { Device, ResPage } from "../interface";
export const getTerminalList = (params: Device.ReqDeviceParams) => {
  return http.get<ResPage<Device.ResDeviceList>>("/api/test", params);
};
