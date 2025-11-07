<script setup>
import NextButton from "../../../components/buttons/NextButton.vue"
import BackButton from "../../../components/buttons/BackButton.vue"

// Add store
import { useSurvey } from "../../../stores/useSurvey"

const { surveyState } = useSurvey()

// Initalize case2 answers if not exists
if (!surveyState.answers["case2"]) {
    surveyState.answers.case2 = {
        q3: null
    }
}

// Function to handle Yes/No answer selection
const selectAnswer = (questionNumber, value) => {
    surveyState.answers.case2[`q${questionNumber}`] = value
}

// Function to check if a value is selected
const isSelected = (questionNumber, value) => {
    return surveyState.answers.case2[`q${questionNumber}`] === value
}
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
            {{ $t('case2.questions.q3') }}
          </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
            <button @click="selectAnswer(3, 'no')"
              :class="[
                'px-12 py-2 border font-bold rounded-full cursor-pointer transition-all',
                isSelected(3, 'no')
                  ? 'bg-pink-300 border-pink-300 text-white'
                  : 'border-pink-300 hover:bg-pink-300 text-gray-700'
              ]">{{ $t('buttons.no') }}</button>
            <button @click="selectAnswer(3, 'yes')"
              :class="[
                'px-12 py-2 border font-bold rounded-full cursor-pointer transition-all',
                isSelected(3, 'yes')
                  ? 'bg-pink-300 border-pink-300 text-white'
                  : 'border-pink-300 hover:bg-pink-300 text-gray-700'
              ]">{{ $t('buttons.yes') }}</button>
        </div>
      </div>

      <div class="flex justify-end gap-6">
        <!-- Back Button -->
        <BackButton back-route="/survey/case2"/>

        <!-- Next Button -->
        <NextButton class="justify-end" next-route="/survey/case3"/>
      </div>
    </div>
</template>

<style scoped></style>