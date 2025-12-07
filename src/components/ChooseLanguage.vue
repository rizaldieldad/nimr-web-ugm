<script setup>
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const { locale, t } = useI18n();
const currentLocale = computed(() => locale.value);
const router = useRouter();
const loadingLang = ref("");

const changeLanguage = (lang) => {
  loadingLang.value = lang;
  locale.value = lang;
  localStorage.setItem("locale", lang);
  setTimeout(() => {
    router.push({ path: "/criteria" });
  }, 500);
};
</script>

<template>
  <div class="flex gap-x-4">
    <button
      @click="changeLanguage('id')"
      :disabled="loadingLang !== ''"
      :class="[
        'border border-sky-500 px-5 py-2 rounded-full transition-all duration-200 ease-in-out flex items-center justify-center gap-2',
        loadingLang !== '' 
          ? 'opacity-60 cursor-not-allowed scale-95 bg-gray-50' 
          : 'hover:bg-sky-500 hover:text-white cursor-pointer active:scale-90 active:bg-sky-600 active:text-white'
      ]"
    >
      <svg v-if="loadingLang === 'id'" class="animate-spin h-4 w-4 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      
      <span v-else class="flex items-center">
        Indonesia 
        <img src="https://flagcdn.com/w20/id.png" alt="Indonesian flag" class="inline w-4 h-3 ml-2">
      </span>
    </button>

    <button
      @click="changeLanguage('en')"
      :disabled="loadingLang !== ''"
      :class="[
        'border border-sky-500 px-5 py-2 rounded-full transition-all duration-200 ease-in-out flex items-center justify-center gap-2',
        loadingLang !== '' 
          ? 'opacity-60 cursor-not-allowed scale-95 bg-gray-50' 
          : 'hover:bg-sky-500 hover:text-white cursor-pointer active:scale-90 active:bg-sky-600 active:text-white'
      ]"
    >
      <svg v-if="loadingLang === 'en'" class="animate-spin h-4 w-4 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      
      <span v-else class="flex items-center">
        English 
        <img src="https://flagcdn.com/w20/gb.png" alt="English flag" class="inline w-4 h-3 ml-2">
      </span>
    </button>
  </div>
</template>

<style scoped></style>
