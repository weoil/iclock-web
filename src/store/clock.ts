import { defineStore } from "pinia";
import { reactive } from "vue";

export const useClockStore = defineStore(
  "clock",
  () => {
    const config = reactive({
      isShowSecond: false, // 是否显示秒
      timeShowFlag: "24" // 时间进制：12/24
    });
    return {
      config: config
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          key: "ClockStore"
        }
      ]
    }
  }
);
