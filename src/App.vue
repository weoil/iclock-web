<!--
 * @Author: LuanZeHui
 * @Date: 2022-05-05 14:48:16
 * @LastEditors: LuanZeHui
 * @LastEditTime: 2022-05-05 18:13:15
 * @Description: file content
-->
<script setup lang="ts">
import { sayHello } from "./api/test";

const onClick = () => {
  sayHello();
};
</script>

<template>
  <button @click="onClick"> Hello </button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 32px;
}
</style>
