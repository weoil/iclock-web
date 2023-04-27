<template>
  <swiper class="clock-footer w-full h-full" :slides-per-view="1" :allow-touch-move="true">
    <swiper-slide><WeiboHots /></swiper-slide>
    <swiper-slide> <ChickenSoup /> </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChickenSoup from "./chicken_soup.vue";
import WeiboHots from "./weibo_hots.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
</script>

<style lang="less" scoped>
.clock-footer {
}
</style>
