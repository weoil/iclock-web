<template>
  <div
    class="chicken-soup text-18px select-none text-center flex justify-center items-center h-full"
  >
    <span @click="switchChickenSoupForTheSoul">
      {{ chickenSoupForTheSoul }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { getChickenSoupForTheSoul } from "@/api/clock";
import { useDoubleClick } from "@/hooks/useDoubleClick";
import { useEmitt } from "@/hooks/useEmitt";
import { onMounted, ref } from "vue";
useEmitt({
  name: "clock_integral_point",
  callback: () => refreshChickenSoupForTheSoulApi()
});
// 心灵鸡汤
const chickenSoupForTheSoul = ref("");
const refreshChickenSoupForTheSoulApi = async () => {
  const res = await getChickenSoupForTheSoul();
  chickenSoupForTheSoul.value = res.data.hitokoto;
};
const switchChickenSoupForTheSoul = useDoubleClick(() => {
  refreshChickenSoupForTheSoulApi();
});
onMounted(() => {
  refreshChickenSoupForTheSoulApi();
});
defineExpose({
  refreshChickenSoupForTheSoulApi
});
</script>

<style lang="less" scoped>
.chicken-soup {
}
</style>
