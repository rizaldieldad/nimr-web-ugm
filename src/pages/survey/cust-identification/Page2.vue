<script setup>
import { computed } from "vue"
import NextButton from "../../../components/buttons/NextButton.vue"
import QuestionCard from "../../../components/QuestionCard.vue"
import { useSurvey } from "../../../stores/useSurvey"

const { surveyState } = useSurvey()
const questions = [{ id: 4 }, { id: 5 }]

// Initialize answers if not exists
if (!surveyState.answers.customerIdentification) {
    surveyState.answers.customerIdentification = {
        q4: null,
        q5: null
    }
}

// Function to handle answer selection
const selectAnswer = (questionId, answer) => {
    surveyState.answers.customerIdentification[`q${questionId}`] = answer
}

// Computed property to checck if all questions are answered
const isNextDisabled = computed(() => {
    return surveyState.answers.customerIdentification.q1 === null ||
        surveyState.answers.customerIdentification.q2 === null ||
        surveyState.answers.customerIdentification.q3 === null
})
</script>

<template>
    <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <!-- Header -->
        <div class="mb-8 md:mb-12">
            <h1 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 flex items-center">
                <span class="mr-3 text-indigo-400">◄</span>
                {{ $t('customer_identification.title') }}
                <span class="ml-auto text-indigo-300">◆</span>
            </h1>
        </div>

        <!-- Question 4 to 5 -->
        <QuestionCard v-for="question in questions" :key="question.id" :question="question"
            topic="customer_identification" store-key="customerIdentification" @answer-selected="selectAnswer" />

        <!-- Next Button -->
        <NextButton :disabled="isNextDisabled" class="justify-end" next-route="/survey/user-internalization" mode="submit"/>
    </div>
</template>