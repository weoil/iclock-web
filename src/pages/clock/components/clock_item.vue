<template>
  <div class="clock-item relative base">
    <div class="absolute base front">
      {{ value }}
    </div>
    <div class="absolute base front" :class="[isAnimate ? 'f_animate' : '']">
      {{ text }}
    </div>
    <div class="absolute base back">
      {{ text }}
    </div>
    <div class="absolute base back" :class="[isAnimate ? 'b_animate' : '']">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from "vue";
const props = defineProps({
  value: {
    type: String,
    default: ""
  }
});
const text = ref(props.value);
const isAnimate = ref(false);
watch(
  () => [props.value],
  () => {
    isAnimate.value = true;
    setTimeout(() => {
      isAnimate.value = false;
      text.value = props.value;
    }, 900);
  }
);
</script>

<style lang="less" scoped>
.base {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: var(--fontSize);
  height: 150px;
  width: 100%;
  background-color: var(--blockGgColor);
}
.clock-item {
  color: var(--fontColor);
  flex: 1;
  background-color: var(--bgColor);
  .front {
    clip-path: inset(0 0 53% 0);
  }
  .back {
    clip-path: inset(49% 0 0 0);
  }
  .f_animate {
    animation: front_flip_down 0.4s ease-out 0s both;
  }
  .b_animate {
    animation: back_flip_down 0.4s ease-out 0.4s both;
    transform: perspective(var(--perspectiveValue)) rotateX(90deg);
  }
  @keyframes front_flip_down {
    form {
      transform: perspective(var(--perspectiveValue)) rotateX(0deg);
    }
    to {
      transform: perspective(var(--perspectiveValue)) rotateX(-90deg);
    }
  }
  @keyframes back_flip_down {
    form {
      transform: perspective(var(--perspectiveValue)) rotateX(90deg);
    }
    to {
      transform: perspective(var(--perspectiveValue)) rotateX(0deg);
    }
  }
}
</style>
