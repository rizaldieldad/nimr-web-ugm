<script setup>
import { computed } from "vue"
import { useSurvey } from "../../../stores/useSurvey"
import QuestionCard from "../../../components/QuestionCard.vue"
import NextButton from "../../../components/buttons/NextButton.vue"

const { surveyState } = useSurvey()

const questions = [{ id: 1 }, { id: 2 }]

// Initialize answers if not exists
if (!surveyState.answers.customerCompliance) {
    surveyState.answers.customerCompliance = {
        q1: null,
        q2: null
    }
}

// Function to handle answer selection
const selectAnswer = (questionId, answer) => {
    surveyState.answers.customerCompliance[`q${questionId}`] = answer
}

// Computer property to check if all questions are answered
const isNextDisabled = computed(() => {
    return surveyState.answers.customerCompliance.q1 === null || surveyState.answers.customerCompliance.q2 === null
})
</script>

<template>
    <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <!-- Header -->
        <div class="mb-8 md:mb-12">
            <h1 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 flex items-center">
                <span class="mr-3 text-indigo-400">◄</span>
                {{ $t('customer_compliance.title') }}
                <span class="ml-auto text-indigo-300">◆</span>
            </h1>
        </div>

        <QuestionCard v-for="question in questions" :key="question.id" :question="question" topic="customer_compliance"
            store-key="customerCompliance" @answer-selected="selectAnswer" />

        <!-- Next Button -->
        <NextButton :disabled="isNextDisabled" class="justify-end" next-route="/survey/big-data-1" mode="nav"/>
    </div>
</template>