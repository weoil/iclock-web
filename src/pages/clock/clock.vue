<template>
  <div class="clock-page flex flex-col justify-center items-center px-30px">
    <div class="time-header flex-shrink-1 flex flex-col justify-end select-none h-3/10 box-content">
      <div class="date h-30px text-30px overflow-hidden">
        <span @click="switchShowSecond">
          {{ date }}
        </span>
        <span class="text-27px ml-20px">{{ week }}</span>
        <span class="text-27px ml-20px" v-if="clockConfig.timeShowFlag === '12'">{{
          isAM ? "上午" : "下午"
        }}</span>
      </div>
    </div>
    <div class="timer flex-grow-1 flex-shrink-0 w-full my-30px">
      <div class="time-block hour" @click="switchTimeFlag">
        <ClockItem :value="time[0]" />
        <ClockItem :value="time[1]" />
      </div>
      <div class="divide">:</div>
      <div class="time-block minute" @click="fullScreen">
        <ClockItem :value="time[2]" />
        <ClockItem :value="time[3]" />
      </div>
      <template v-if="clockConfig.isShowSecond">
        <div class="divide">:</div>
        <div class="time-block second">
          <ClockItem :value="time[4]" />
          <ClockItem :value="time[5]" />
        </div>
      </template>
    </div>
    <div class="time-footer h-1/3 flex-grow-0 overflow-hidden flex-shrink-1 w-full">
      <ClockFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ClockItem from "./components/clock_item.vue";
import { useNoSleep } from "@/hooks/useNoSleep";
import { useDoubleClick } from "@/hooks/useDoubleClick";
import ClockFooter from "./components/clock_footer.vue";
import { useClockStore } from "@/store/clock";
import { useEmitt } from "@/hooks/useEmitt";
const timeformat24 = "YYYY/MM/DD HHmmss d A";
const timeformat12 = "YYYY/MM/DD hhmmss d A";
const event = useEmitt().emitter;
const clockStore = useClockStore();
const clockConfig = computed(() => clockStore.config);
const getTimerArray = () => {
  return dayjs()
    .format(clockConfig.value.timeShowFlag === "12" ? timeformat12 : timeformat24)
    .split(" ");
};
const currentTime = ref(getTimerArray());
//判断时间上午还是下午
const isAM = computed(() => {
  return currentTime.value[3] === "AM";
});
const numberToChinese = new Map([
  [0, "日"],
  [1, "一"],
  [2, "二"],
  [3, "三"],
  [4, "四"],
  [5, "五"],
  [6, "六"]
]);
const date = computed(() => {
  return currentTime.value[0];
});
const time = computed(() => {
  return currentTime.value[1].split("");
});
const week = computed(() => {
  return "周" + numberToChinese.get(Number(currentTime.value[2]));
});
let timer: NodeJS.Timer;
// 刷新时间
const refreshTime = () => {
  clearTimeout(timer);
  const now = Date.now();
  const delay = 1000 - (now % 1000);
  currentTime.value = getTimerArray();
  // 每个小时触发一次
  if (currentTime.value[1].endsWith("0000")) {
    event.emit("clock_integral_point");
  }
  // 每十分钟触发一次
  if (currentTime.value[1].endsWith("000")) {
    event.emit("clock_ten_minute");
  }
  timer = setTimeout(refreshTime, delay);
};
// 防止设备锁屏
const noSleep = useNoSleep(false);
onMounted(() => {
  refreshTime();
});
onBeforeUnmount(() => {
  clearTimeout(timer);
  noSleep.disable();
});
// 全屏并尝试进行屏幕常亮
const fullScreen = useDoubleClick(async () => {
  // 检测是否全屏
  if (document.fullscreenElement) {
    document.exitFullscreen();
    noSleep.disable();
    return;
  }
  noSleep.enable();
  document.documentElement.requestFullscreen();
});

// 切换是否显示秒
const switchShowSecond = useDoubleClick(() => {
  clockConfig.value.isShowSecond = !clockConfig.value.isShowSecond;
});

// 切换时间的显示模式
const switchTimeFlag = useDoubleClick(() => {
  clockConfig.value.timeShowFlag = clockConfig.value.timeShowFlag === "12" ? "24" : "12";
  refreshTime();
});
</script>

<style lang="less" scoped>
.clock-page {
  --bgColor: black;
  --fontColor: rgb(202, 202, 202);
  --blockGgColor: rgb(34, 34, 34);
  --fontSize: 130px;
  --perspectiveValue: 360px;
  color: rgb(202, 202, 202);
  background-color: var(--bgColor);
  height: 100vh;
  font-family: Roboto-Medium;
  overflow: hidden;
  animation: color-change 1s infinite;
  .date {
    color: var(--fontColor);
  }
  .timer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    .divide {
      flex-grow: 0;
      width: 20px;
      height: 150px;
      line-height: 135px;
      font-size: 48px;
      text-align: center;
    }
    .time-block {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      & + .time-block {
        margin-left: 20px;
      }
      ::v-deep(.clock-item) {
        & + .clock-item {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
