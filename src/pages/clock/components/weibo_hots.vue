<template>
  <div class="weibo-hots mt-24px flex flex-wrap justify-center text-center overflow-hidden">
    <div
      class="band w-200px text-12px mb-16px overflow-hidden overflow-ellipsis"
      v-for="band in bandList"
      :key="band.word"
      @click="toHotNews(band)"
    >
      {{ band.word }}</div
    >
  </div>
</template>

<script setup lang="ts">
import { getWeiBoHots } from "@/api/news";
import { WeiBoHotBand_list } from "@/api/news/news.types";
import { useDoubleClick } from "@/hooks/useDoubleClick";
import { useEmitt } from "@/hooks/useEmitt";
import { ref } from "vue";
const bandList = ref<WeiBoHotBand_list[]>([]);
useEmitt({
  name: "clock_integral_point",
  callback: () => refreshWeiBoHotsApi()
});
const refreshWeiBoHotsApi = async () => {
  const res = await getWeiBoHots();
  bandList.value = res.data.band_list.slice(0, 12);
};
refreshWeiBoHotsApi();
const toHotNews = useDoubleClick((_) => {
  // console.log(band);
});
</script>

<style lang="less" scoped>
.weibo-hots {
}
</style>
