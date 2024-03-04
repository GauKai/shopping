<script setup>
import { RouterLink, RouterView } from 'vue-router'

// 改成 pinia
let cartValue = 0;

</script>

<template>
  <!-- 公版 -->
  <header>
    <nav class="w-full h-[40px] flex gap-3 p-2 bg-black text-white fixed">
      <RouterLink to="/">購物頁面</RouterLink>
      <RouterLink to="/ShoppingCar" class="relative">
        這是購物車
        <div class="w-[20px] h-[20px] bg-red-500 text-center leading-[16px] text-white rounded-full absolute top-[-3px] right-[-16px]">{{ cartValue }}</div>

      </RouterLink>
    </nav>
  </header>

  <div class="pt-[40px]">
    <RouterView />
  </div>

</template>

<style scoped>
nav a.router-link-exact-active {
  color: yellow;
}
</style>
