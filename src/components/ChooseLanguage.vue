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
      class="border border-sky-500 px-5 py-2 rounded-full"
    >
      Indonesia 🇮🇩
    </button>
    <button
      @click="changeLanguage('en')"
      class="border border-sky-500 px-5 py-2 rounded-full"
    >
      English 🇬🇧
    </button>
  </div>
</template>

<style scoped></style>
