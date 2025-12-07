<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { locale, t } = useI18n();
const currentLocale = computed(() => locale.value);
const router = useRouter();

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem("locale", lang);

  router.push({ path: "/criteria" });
};
</script>

<template>
  <div class="flex gap-x-4">
    <button
      @click="changeLanguage('id')"
      class="border border-sky-500 hover:bg-sky-500 hover:text-white px-5 py-2 rounded-full cursor-pointer active:scale-90 active:bg-sky-600 active:text-white"
    >
      Indonesia 
      <img src="https://flagcdn.com/w20/id.png" alt="Indonesian flag" class="inline w-4 h-3 ml-2">
    </button>
    <button
      @click="changeLanguage('en')"
      class="border border-sky-500 hover:bg-sky-500 hover:text-white px-5 py-2 rounded-full cursor-pointer active:scale-90 active:bg-sky-600 active:text-white"
    >
      English 
      <img src="https://flagcdn.com/w20/gb.png" alt="English flag" class="inline w-4 h-3 ml-2">
    </button>
  </div>
</template>

<style scoped></style>
