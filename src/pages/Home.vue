<script setup>
import ChooseLanguage from "../components/ChooseLanguage.vue";
</script>

<template>
  <section
    class="w-full mx-auto max-w-5xl flex flex-col justify-between h-screen p-10 lg:p-20 text-center"
  >
    <h1 class="text-4xl lg:text-6xl font-bold">HALLO!</h1>

    <p class="text-lg lg:text-4xl text-justify">
      Perkenalkan nama saya Esa Panganti, website ini dibuat sebagai bagian dari
      proses penelitian saya untuk melihat seberapa jauh urgensi penerapan
      Nationally Integrated Medical Records (NIMR) di Indonesia, partisipasi dan
      dukungan Anda sangat berarti bagi kelancaran dan keberhasilan penelitian
      ini.
    </p>

    <div class="flex flex-col items-center gap-y-5">
      <p class="text-2xl tracking-widest">Pemilihan Bahasa</p>
      <ChooseLanguage />
    </div>
  </section>
</template>

<style scoped></style>
