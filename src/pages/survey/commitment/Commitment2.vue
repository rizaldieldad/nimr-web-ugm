<script setup>
import { ref, computed } from "vue"
import QuestionCard from "../../../components/QuestionCard.vue"
import NextButton from "../../../components/buttons/NextButton.vue"
import { useSurvey } from "../../../stores/useSurvey"

const { surveyState } = useSurvey()

const questions = [{ id: 4 }, { id: 5 }]

// Initialize commitment answers if not exists
if (!surveyState.answers.commitment) {
    surveyState.answers.commitment = {
        q4: null,
        q5: null
    }
}

// Function to handle answer selection
const selectAnswer = (questionId, answer) => {
    surveyState.answers.commitment[`q${questionId}`] = answer
}

// Computed property to checck if all questions are answered
const isNextDisabled = computed(() => {
    return surveyState.answers.commitment.q4 === null ||
        surveyState.answers.commitment.q5 === null
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

        <!-- Question 4 to 5 -->
        <QuestionCard v-for="question in questions" :key="question.id" :question="question" topic="commitment"
            store-key="commitment" @answer-selected="selectAnswer" />

        <!-- Next Button -->
        <NextButton :disabled="isNextDisabled" class="justify-end" next-route="/survey/customer-identification-1" mode="nav"/>
    </div>
</template>

<style scoped></style>