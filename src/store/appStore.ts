import { defineStore } from "pinia";
import settings from "@/settings";
const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      ...settings,
    };
  },
  getters: {},
  actions: {},
});
export default useAppStore;
