import { defineStore } from "pinia";
import { reactive } from "vue";

export const useClockStore = defineStore(
  "clock",
  () => {
    const config = reactive({
      isShowSecond: true, // 是否显示秒
      timeShowFlag: "24", // 时间进制：12/24
      footerSwiperActiveIndex: 0 // 底部轮播图默认选中索引
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
