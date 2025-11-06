<script setup>
import NextButton from "../../../components/buttons/NextButton.vue"
</script>

<template>
    <div class="max-w-4xl mx-auto flex flex-col justify-center min-h-screen p-4 md:p-8 space-y-6">
      <!-- Header -->
      <div class="mb-8 md:mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 flex items-center">
          <span class="mr-3 text-indigo-400">◄</span>
          {{ $t('case1.title') }}
          <span class="ml-auto text-indigo-300">◆</span>
        </h1>
      </div>

      <!-- Question 1 -->
      <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
        <!-- Question Header -->
        <div class="flex items-start gap-4 mb-6">
          <div
            class="shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            1
          </div>
          <p class="text-lg md:text-xl text-gray-800 italic flex-1 pt-1">
            {{ $t('case1.questions.q1') }}
          </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
          <button
            v-for="value in 5"
            :key="value"
            class="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-lg md:text-xl font-semibold transition-all duration-200 transform hover:scale-110 bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:bg-indigo-50"
          >
            {{ value }}
          </button>
        </div>
      </div>

      <!-- Next Button -->
      <NextButton class="justify-end" next-route="/survey/case2"/>
    </div>
</template>

<style scoped></style>