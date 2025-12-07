<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const isLoading = ref(false);

const handleNext = () => {
    isLoading.value = true;
    setTimeout(() => {
        router.push("/consent");
    }, 500);
}
</script>

<template>
  <section
    class="w-full bg-[url('./assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./assets/images/backgrounds/bg_primary.png')] bg-cover bg-center transition-all duration-500"
  >
    <div class="mx-auto max-w-5xl h-screen flex flex-col justify-between p-10 lg:p-20 text-center">
        <h1 class="text-4xl lg:text-6xl font-bold text-center">
        {{ $t("participation_criteria.title") }}
      </h1>

      <ol class="list-decimal space-y-5 pl-5">
        <li class="text-lg lg:text-3xl text-justify font-light">
          {{ $t("participation_criteria.criteria1") }}
        </li>
        <li class="text-lg lg:text-3xl text-justify font-light">
          {{ $t("participation_criteria.criteria1") }}
        </li>
      </ol>

      <div class="flex justify-center">
        <button
          @click="handleNext"
          :disabled="isLoading"
          :class="[
            'w-16 h-16 border-2 font-semibold rounded-full cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center',
            isLoading 
             ? 'border-sky-500 bg-sky-50 cursor-wait scale-95' 
             : 'border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 active:scale-90 active:bg-sky-600 active:text-white'
          ]"
        >
          <svg v-if="isLoading" class="animate-spin h-6 w-6 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>

          <span v-else>
            {{ $t("buttons.next") }}
          </span>
        </button>
      </div>
    </div>      
  </section>
</template>

<style scoped></style>
