<script setup>
import NextButton from '../../../components/buttons/NextButton.vue';
</script>

<template>
    <div class="max-w-6xl mx-auto flex flex-col min-h-screen p-6 md:p-4 space-y-6">
      <!-- Header -->
      <div class="my-8 md:my-16">
        <h1 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 flex items-center">
          <span class="mr-3 text-indigo-400">◄</span>
          {{ $t('case7.title') }}
          <span class="ml-auto text-indigo-300">◆</span>
        </h1>
      </div>

      <!-- Text Content -->
       <p class="text-lg lg:text-3xl text-justify" v-html="$t('case7.description')"></p>
      
       <!-- Next Button -->
      <NextButton class="justify-end mt-6 md:mt-15" next-route="/survey/case7/question-1"/>
    </div>
</template>

<style scoped></style>