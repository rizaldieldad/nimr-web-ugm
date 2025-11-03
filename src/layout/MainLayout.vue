<script setup></script>

<template>
  <div
    class="min-h-screen w-full bg-[url('./src/assets/images/sec_background.png')] lg:bg-[url('./src/assets/images/background.png')] bg-cover bg-center text-white transition-all duration-500"
  >
    <main class="container mx-auto text-black">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
