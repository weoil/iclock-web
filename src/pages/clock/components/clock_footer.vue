<template>
  <swiper
    class="clock-footer w-full h-full"
    :slides-per-view="1"
    :allow-touch-move="true"
    :initial-slide="clockStore.config.footerSwiperActiveIndex"
    @slide-change="onSlideChange"
  >
    <swiper-slide><WeiboHots /></swiper-slide>
    <swiper-slide> <ChickenSoup /> </swiper-slide>
    <swiper-slide> <span></span> </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChickenSoup from "./chicken_soup.vue";
import WeiboHots from "./weibo_hots.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useClockStore } from "@/store/clock";
const clockStore = useClockStore();

const onSlideChange = (e) => {
  clockStore.config.footerSwiperActiveIndex = e.activeIndex;
};
</script>

<style lang="less" scoped>
.clock-footer {
}
</style>
