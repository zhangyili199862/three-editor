import { createPinia, defineStore, Pinia } from "pinia";
import { GlobalState } from "./interface";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export const GlobalStore = defineStore({
  id: "GlobalState",
  state: (): GlobalState => {
    return {
      token: "",
    };
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
  persist: piniaPersistConfig("GlobalState"),
});

const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
