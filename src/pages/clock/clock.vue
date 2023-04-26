<template>
  <div class="clock-page flex justify-center items-center px-30px">
    <div class="timer w-full" @click="fullScreen">
      <div class="time-block hour">
        <ClockItem :value="currentTime[0]" />
        <ClockItem :value="currentTime[1]" />
      </div>
      <div class="divide">:</div>
      <div class="time-block minute">
        <ClockItem :value="currentTime[2]" />
        <ClockItem :value="currentTime[3]" />
      </div>
      <div class="divide">:</div>
      <div class="time-block second">
        <ClockItem :value="currentTime[4]" />
        <ClockItem :value="currentTime[5]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ClockItem from "./components/clock_item.vue";
import { useNoSleep } from "@/hooks/useNoSleep";
const timeformat = "HHmmss";
const getTimerArray = () => {
  return dayjs().format(timeformat).split("");
};
const currentTime = ref(getTimerArray());

let timer: NodeJS.Timer;
const refreshTime = () => {
  const delay = 1000 - (Date.now() % 1000);
  currentTime.value = getTimerArray();
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
let lastClickFullScreenTime = 0;
const fullScreen = async () => {
  console.log(lastClickFullScreenTime);
  if (lastClickFullScreenTime + 300 < Date.now()) {
    lastClickFullScreenTime = Date.now();
    return;
  }
  noSleep.enable();
  lastClickFullScreenTime = 0;
  // 检测是否全屏
  if (document.fullscreenElement) {
    document.exitFullscreen();
    noSleep.disable();
    return;
  }
  document.documentElement.requestFullscreen();
};
</script>

<style lang="less" scoped>
.clock-page {
  --bgColor: black;
  --fontColor: white;
  --blockGgColor: rgb(34, 34, 34);
  --fontSize: 130px;
  --perspectiveValue: 360px;
  background-color: var(--bgColor);
  height: 100vh;
  font-family: Roboto-Medium;
  overflow: hidden;
  animation: color-change 1s infinite;
  .timer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .divide {
      flex-grow: 0;
      width: 20px;
      height: 150px;
      line-height: 138px;
      color: rgb(202, 202, 202);
      font-size: 48px;
      text-align: center;
    }
    .time-block {
      display: flex;
      align-items: center;
      justify-content: center;
      // color: white;
      // @font-size: 120px;
      // font-size: @font-size;
      // height: 260px;
      // width: 200px;
      // background-color: rgb(56, 56, 56);
      // // padding: 0 40px;
      flex: 1;
      // box-sizing: content-box;
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
