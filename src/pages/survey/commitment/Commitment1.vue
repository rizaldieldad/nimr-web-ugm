<script setup>
import { computed, ref } from "vue"
import NextButton from "../../../components/buttons/NextButton.vue"
import QuestionCard from "../../../components/QuestionCard.vue"
import { useSurvey } from "../../../stores/useSurvey"

const { surveyState } = useSurvey()

// Define questions
const questions = [{ id: 1 }, { id: 2 }, { id: 3 }]

// Initialize commitment answers if not exists
if (!surveyState.answers.commitment) {
    surveyState.answers.commitment = {
        q1: null,
        q2: null,
        q3: null
    }
}

// Function to handle answer selection
const selectAnswer = (questionId, answer) => {
    surveyState.answers.commitment[`q${questionId}`] = answer
}

// Computed property to check if all questions are answered
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

        <!-- Question 1 to 3 -->
        <QuestionCard v-for="question in questions" :key="question.id" :question="question" topic="commitment"
            store-key="commitment" @answer-selected="selectAnswer" />

        <!-- Next Button -->
        <NextButton :disabled="isNextDisabled" class="justify-end" next-route="/survey/commitment-2" mode="nav"/>
    </div>
</template>

<style scoped></style>