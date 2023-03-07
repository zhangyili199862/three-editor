import http from "../index";
import { ReqPage } from "../interface";
export const getDevicePage = (data: ReqPage) => {
  return http.get("/supaiot/api/config/device/page", data);
};
