<script setup>
import { computed } from "vue"
import NextButton from "../../../components/buttons/NextButton.vue"

// Add store
import { useSurvey } from "../../../stores/useSurvey"

const { surveyState } = useSurvey()

// Intialize commitment answers if not exists
if (!surveyState.answers.commitment) {
    surveyState.answers.commitment = {
        q1: null,
        q2: null,
        q3: null
    }
}

// Function to handle answer selection
const selectAnswer = (questionNumber, value) => {
    surveyState.answers.commitment[`q${questionNumber}`] = value
}

// Function to check if a value is selected
const isSelected = (questionNumber, value) => {
    return surveyState.answers.commitment[`q${questionNumber}`] === value
}

// Computed property to checck if all questions are answered
const isNextDisabled = computed(() => {
    return surveyState.answers.commitment.q1 === null || 
           surveyState.answers.commitment.q2 === null || 
           surveyState.answers.commitment.q3 === null
})
</script>

<template>
    <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <!-- Header -->
      <div class="mb-8 md:mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 flex items-center">
          <span class="mr-3 text-indigo-400">◄</span>
          {{ $t('commitment.title') }}
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
            {{ $t('commitment.question.q1') }}
          </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
          <button
            v-for="value in 5"
            :key="value"
            @click="selectAnswer(1, value)"
            :class="[
              'w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-lg md:text-xl font-semibold transition-all duration-200 transform hover:scale-110',
              isSelected(1, value)
                ? 'bg-indigo-500 border-indigo-500 text-white'
                : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:bg-indigo-50'
            ]"
          >
            {{ value }}
          </button>
        </div>
      </div>

      <!-- Question 2 -->
      <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
        <!-- Question Header -->
        <div class="flex items-start gap-4 mb-6">
          <div
            class="shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            2
          </div>
          <p class="text-lg md:text-xl text-gray-800 italic flex-1 pt-1">
            {{ $t('commitment.question.q2') }}
          </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
          <button
            v-for="value in 5"
            :key="value"
            @click="selectAnswer(2, value)"
            :class="[
              'w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-lg md:text-xl font-semibold transition-all duration-200 transform hover:scale-110',
              isSelected(2, value)
                ? 'bg-indigo-500 border-indigo-500 text-white'
                : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:bg-indigo-50'
            ]"
          >
            {{ value }}
          </button>
        </div>
      </div>

      <!-- Question 3 -->
      <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
        <!-- Question Header -->
        <div class="flex items-start gap-4 mb-6">
          <div
            class="shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            3
          </div>
          <p class="text-lg md:text-xl text-gray-800 italic flex-1 pt-1">
            {{ $t('commitment.question.q3') }}
          </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
          <button
            v-for="value in 5"
            :key="value"
            @click="selectAnswer(3, value)"
            :class="[
              'w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-lg md:text-xl font-semibold transition-all duration-200 transform hover:scale-110',
              isSelected(3, value)
                ? 'bg-indigo-500 border-indigo-500 text-white'
                : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:bg-indigo-50'
            ]"
          >
            {{ value }}
          </button>
        </div>
      </div>

      <!-- Next Button -->
      <NextButton :disabled="isNextDisabled" class="justify-end" next-route="/survey/commitment-2"/>
    </div>
</template>

<style scoped></style>