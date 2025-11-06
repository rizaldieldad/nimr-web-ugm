<script setup>
import NextButton from "../../../components/buttons/NextButton.vue"
</script>

<template>
    <div class="max-w-4xl mx-auto flex flex-col justify-center min-h-screen p-4 md:p-8 space-y-6">

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
            {{ $t('case6.questions.q3') }}
          </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
            <button class="px-12 py-2 border border-pink-300 hover:bg-pink-300 font-bold rounded-full cursor-pointer">{{ $t('buttons.no') }}</button>
            <button class="px-12 py-2 border border-pink-300 hover:bg-pink-300 font-bold rounded-full cursor-pointer">{{ $t('buttons.yes') }}</button>
        </div>
      </div>

      <!-- Next Button -->
      <NextButton class="justify-end" next-route="/survey/case7"/>
    </div>
</template>

<style scoped></style>